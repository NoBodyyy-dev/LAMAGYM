const Router = require('express');
const {createComment, getPostComment, updateComment, deleteComment} = require("../controllers/commentController")
const authMiddleware = require("../middlewares/authMiddleware")
const {check} = require("express-validator")

const commentRouter = new Router();

commentRouter.post("/createComment/:postId", [
    check("text", "Комментарий не должен быть пустым").trim().notEmpty(),
    authMiddleware
], createComment);

commentRouter.put("/updateComment/:commentId", [
    check("text", "Комментарий не должен быть пустым").trim().notEmpty(),
    authMiddleware
], updateComment);

commentRouter.delete("/deleteComment/:commentId", authMiddleware, deleteComment);

commentRouter.get("/getPostComment/:postId", getPostComment);

module.exports = commentRouter