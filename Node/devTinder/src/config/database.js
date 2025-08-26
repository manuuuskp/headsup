const mongoose = require("mongoose");

async function connectDB() {
  await mongoose.connect(
    "mongodb+srv://manojvelusamy:AymzA23.e6s8RaE@devtinder.l9krpyr.mongodb.net/devTinder"
  );
}

module.exports = {
    connectDB
}
