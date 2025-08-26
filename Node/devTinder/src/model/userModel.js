const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const UserModel = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error(`Not a valid Email: ${value}`)
            }
        }
    },
    password: {
        type: String,
        validate(value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error(`Not a Strong Password: ${value}`)
            }
        }
    },
    age: {
        type: Number,
        min: 18,
        max: 75
    },
    gender: {
        type: String,
        enum: ["male", "female", "others"]
    },
    photoUrl: {
        type: String,
        default: 'https://as1.ftcdn.net/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg'
    },
    about: {
        type: String,
        default: "This is my default bio but you know what I'm really cool"
    }
})

UserModel.methods.getJWT = function() {
    const user = this;
    try {
      const token = jwt.sign({id: user._id}, 'DevTinder@07$');
      return token;
    } catch (e) {
      console.log(e.message);
      throw new Error(e)
    }
}

const User = mongoose.model("User", UserModel)

module.exports = User