const User = require('../model/userModel');
const jwt = require("jsonwebtoken");

const admin = (req, res, next) => {
    console.log("Admin Auth")
  const isAuthenticated = true;
  try {
    if (!isAuthenticated) {
      throw new Error("Error is thrown baby");
    }
  } catch (e) {
    res.status(500).send(e.message)
  }
  next();
};

const userAuth = async (req, res, next) => {
  try {
    const {id} = jwt.verify(req.cookies.token, 'DevTinder@07$');

    const user = await User.findById(id);
    
    if (!user) {
      res.status(404).send("User Not Found");
    } else {
      req.user = user;
      next();
    }
  } catch(e) {
    res.status(401).send('something went');
  }
}

module.exports = {
    admin,
    userAuth
}
