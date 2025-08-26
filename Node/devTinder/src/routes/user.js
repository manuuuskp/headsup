const express = require("express");
const ConnectionRequest = require("../model/connectionRequest");
const { userAuth } = require("../middleware/utils");
const User = require("../model/userModel");

const route = express.Router();

route.get("/user/requests", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: user._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName about photoUrl age gender");
    res.send(connectionRequests);
  } catch (e) {
    res.status(500).send(`Something went wrong ${e.message}`);
  }
});

route.get("/user/connections", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: user._id, status: "accepted" },
        { fromUserId: user._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", "firstName lastName about photoUrl age gender")
      .populate("toUserId", "firstName lastName about photoUrl age gender");
    const crData = connectionRequest.map((request) => {
      if (request.fromUserId.equals(user._id)) {
        return request.toUserId;
      }
      return request.fromUserId;
    });
    res.send(crData);
  } catch (e) {
    res.status(500).send(`Something went wrong ${e.message}`);
  }
});

route.get("/feed", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const connectionData = await ConnectionRequest.find({
      $or: [{ fromUserId: user._id }, { toUserId: user._id }],
    }).select("fromUserId toUserId");

    const existingData = new Set();

    connectionData.forEach((connection) => {
      console.log(connection.fromUserId.toString());
      existingData.add(connection.fromUserId.toString());
      existingData.add(connection.toUserId.toString());
    });

    const userData = await User.find({
      $and: [
        { _id: { $nin: Array.from(existingData) } },
        { _id: { $ne: user._id } },
      ],
    }).select("firstName lastName age gender photoUrl about");

    res.send(userData);
  } catch (e) {
    res.status(500).send(`Something went wrong ${e.message}`);
  }
});

module.exports = route;
