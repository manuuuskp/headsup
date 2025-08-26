const express = require("express");
const cookieParser = require("cookie-parser");
const { admin, userAuth } = require("./middleware/utils");
const { connectDB } = require("./config/database");
const authRoute = require("./routes/auth");
const profileRoute = require("./routes/profile");
const requestRoute = require("./routes/connectionRequest");
const userRoute = require("./routes/user");
const User = require("./model/userModel");
const cors = require("cors");

const app = express();

app.use(cors({
    origin:'http://localhost:5173',
    credentials: true

}))
app.use(express.json());
app.use(cookieParser());

app.use('/', authRoute); 
app.use('/', profileRoute);
app.use('/', requestRoute);
app.use('/', userRoute);

app.get("/feed", userAuth, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId, {
      returnDocument: "after",
    });
    res.send(user);
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const userData = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, userData, {
      returnDocument: "after",
    });
    res.send(user);
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
});

app.use("/", (req, res, next) => {
  res.send("I'm invicible");
});

connectDB()
  .then(() => {
    console.log("DB Connection Successful");
    app.listen(7777, () => {
      console.log("server is listening in port 7777");
    });
  })
  .catch(() => {
    console.log("DB Connection is not successful");
  });
