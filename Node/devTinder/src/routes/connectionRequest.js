const express = require("express");
const mongoose = require("mongoose");
const { userAuth } = require("../middleware/utils");
const ConnectionRequest = require("../model/connectionRequest");
const User = require("../model/userModel");

const route = express.Router();

route.post("/request/send/:status/:userId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.userId;
    const status = req.params.status;

    const allowedStatus = ["interested", "ignored"];

    if (!allowedStatus.includes(status)) {
      return res.status(500).send("status is not allowed");
    }

    const user = await User.findOne({_id: mongoose.isValidObjectId(toUserId) ? new mongoose.Types.ObjectId(toUserId) : null});

    if (!user) {
      return res.status(500).send("User not found");
    }

    const existingConnectionRequest = await ConnectionRequest.findOne({$or: [
        {fromUserId, toUserId}, {fromUserId: toUserId, toUserId: fromUserId}
    ]});

    if(existingConnectionRequest) {
        return res.status(500).send("Connection Already Present");
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });
    await connectionRequest.save();
    res.send(`${fromUserId} has sent the connection request to ${toUserId}`);
  } catch (e) {
    res.status(500).send(`Something went wrong ${e.message}`);
  }
});

route.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const {status, requestId} = req.params;
        const user = req.user;
        const allowedStatus = ["accepted", "rejected"];
        const isAllowed = allowedStatus.includes(status);
        if(!isAllowed) {
            return res.status(400).send("status not allowed");
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id: mongoose.isValidObjectId(requestId) ? new mongoose.Types.ObjectId(requestId) : null,
            toUserId: user._id,
            status: 'interested'
        });

        console.log(connectionRequest);

        if(!connectionRequest) {
            return res.status(400).send("not a valid request");
        }

        connectionRequest.status = status;

        await connectionRequest.save();

        res.send(`connection request ${status} successfully`);

    } catch(e) {
        res.status(500).send(`Something went wrong ${e.message}`);
    }
});

module.exports = route;
