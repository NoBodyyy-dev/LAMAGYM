// imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/errorMiddleware");
const router = require("./router/index");
const {server, app} = require("./socket/socket")
const {clientUrl, port, dbUrl, socketPort} = require("./config/config")

// app.use
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: clientUrl,
    credentials: true,
}));
app.use("/api", router);
app.use(errorMiddleware);

// run app
async function run() {
    try {
        await mongoose.connect(dbUrl);
        server.listen(port);
        console.log(`Сервер запущен на http://localhost:${port}`);
    } catch (e) {
        console.log(e);
    }
}

run().catch(console.log);
