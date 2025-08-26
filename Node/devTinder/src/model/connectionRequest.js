const mongoose = require("mongoose");

const connectionRequest = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: '{VALUE} is not acceptable'
        }
    }
}, {timestamps: true})

connectionRequest.pre("save", function(next){
    const request = this;
    if(request.fromUserId.equals(request.toUserId)) {
        throw new Error("Request cannot be sent to the self");
    }
    next();
})

connectionRequest.index({fromUserId: 1, toUserId: 1});

const connectionRequestModel = mongoose.model("connectionRequest", connectionRequest);

module.exports = connectionRequestModel;