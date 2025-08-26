const express = require("express");
const { userAuth } = require("../middleware/utils");

const route = express.Router();

route.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
});

route.patch("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;
        Object.keys(req.body).forEach(key => user[key] = req.body[key]);
        const savedUser = await user.save();
        res.send(savedUser);
    } catch(e) {
        res.status(500).send(`Something went wrong ${e.message}`)
    }
});

module.exports = route;