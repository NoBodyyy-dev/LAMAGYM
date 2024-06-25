// imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors")
const router = require("./router/index");
const cookieParser = require("cookie-parser")
const errorMiddleware = require("./middlewares/errorMiddleware")

// server
const URL = process.env.DB_URL;
const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

// app.use
app.use(express.json());
app.use(cookieParser())
app.use(cors())
app.use("/api", router);
app.use(errorMiddleware)

// run app
async function run() {
    try {
        await mongoose.connect(URL);
        server.listen(PORT);
        console.log(`Сервер запущен на http://localhost:${PORT}`);
    } catch (error) {
        console.log(error);
    }
}

run().catch(console.log);
