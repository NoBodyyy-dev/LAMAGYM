// imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const {Server} = require("socket.io");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/errorMiddleware");
const router = require("./router/index");
const io = require("./socket/socket")
const {clientUrl, port, dbUrl, socketPort} = require("./config/config")

// server
const app = express();
const server = http.createServer(app);

// app.use
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: clientUrl,
    credentials: true,
}));
app.use("/api", router);
app.use(errorMiddleware);

// const io = new Server(server, {
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST", "PUT", "Delete"],
//     }
// });
//
// io.on("connection", (socket) => {
//     socket.on("join", ({name, room}) => {
//         socket.join(room)
//         socket.broadcast.to()
//     })
//
//
//     io.on("disconnect", () => console.log("Disconnected"));
// })

// run app
async function run() {
    try {
        await mongoose.connect(dbUrl);
        server.listen(port);
        io.listen(socketPort);
        console.log(`Сервер запущен на http://localhost:${port}`);
    } catch (e) {
        console.log(e);
    }
}

run().catch(console.log);
