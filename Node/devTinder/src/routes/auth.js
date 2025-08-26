const express = require("express");
const {hashPassword, comparePassword} = require("../utils");
const User = require("../model/userModel");

const authRoute = express.Router();

authRoute.post("/signUp", async (req, res) => {
  console.log(req.body);

  try {
    const data = {
        ...req.body,
        password: await hashPassword(req.body.password)
    }

    const availableKeys = [
      "firstName",
      "lastName",
      "email",
      "password",
      "age",
      "gender",
      "photoUrl",
      "about"
    ];

    if (!Object.keys(data).every((key) => availableKeys.includes(key))) {
        throw new Error("Unwanted data present")
    }

    const user = new User(data);

    await user.save();

    res.send("User Created Successfully");
  } catch (e) {
    res.status(500).send(`Something went wrong.${e.message}`);
  }
});

authRoute.post("/login", async (req, res) => {
    
    try {
        
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user) {
            res.status(404).send("User not found");
        }

        if(!await comparePassword(password, user.password)) {
            res.status(500).send("Invalid Credentials");
        }

        const currentUser = user;

        const token = currentUser.getJWT();

        res.cookie("token", token);
        res.json({
            message: "User loggedin successfully",
            data: user
        });

    } catch(e) {
        res.status(500).send(`Something went wrong ${e.message}`)
    }
});

authRoute.post("/logout", (req, res) => {
    try {
        res.cookie("token", null, {expires: new Date(Date.now())});
        res.send("User Logged out successfully");
    } catch(e) {
        res.status(500).send(`Something went wrong ${e.message}`);
    }
});

module.exports = authRoute;