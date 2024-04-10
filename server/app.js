// imports
const mongoose = require("mongoose");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const cors = require("cors");
const bp = require('body-parser')

// server
const URL = "mongodb://83.239.75.58:17027/Dmitry";
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// app.use
app.use(express.json());
app.use(cors());
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

// users
const userSchema = require("./models/UserSchema");
const User = mongoose.model("User", userSchema);

// get all users
app.get("/user/getAll", async (req, res) => {
    try {
        const allUsers = await User.find({})
        res.json(allUsers)
    } catch (error) {
        console.log(error);
        res.status(500)
    }
})

// get user login details
app.get("/user/login", async (req, res) => {
    try {
        const allUsers = await User.find({
            username: req.body.username, 
            email: req.body.email
        })
        res.json(allUsers)
    } catch (error) {
        console.log(error);
        res.status(500)
    }
})


// create user  
app.post("/user/create", async (req, res) => {
  console.log(req.body);
  if (!req.body) return res.sendStatus(400);
  if (!req.body.username || !req.body.email || !req.body.password)
    return res.sendStatus(400);

  const usernameCreate = req.body.username;
  const emailCreate = req.body.email;
  const passwordCreate = req.body.password;

  const user = {
    username: usernameCreate,
    email: emailCreate,
    password: passwordCreate,
    followersCount: 0,
    iFollowedFor: [],
    mySubs: [],
    purSubs: [],
  };

  try {
    const newUser = await User.create(user);
    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// run app
async function run() {
  try {
    await mongoose.connect(URL);
    console.log("Успешное подключение к базе данных");
    server.listen(3000);
    console.log("Сервер запущен на http://localhost:3000");
  } catch (error) {
    console.log(error);
  }
}

run().catch(console.log);
