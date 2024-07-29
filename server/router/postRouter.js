const Router = require("express")
const postRouter = new Router()
const {createPost, getAllPosts, updatePost, deletePost} = require("../controllers/postController")
const authMiddleware = require("../middlewares/authMiddleware")
const {check} = require("express-validator")

postRouter.post("/createPost", [
    check("body", "Тело поста не может быть пустым").trim().notEmpty(),
    check("images", "Слишком много фотографий").isLength({min: 0, max: 10}),
    check("tags", "Укажите хотя бы 1 тег").isLength({min: 1}),
    authMiddleware
], createPost)

// postRouter.post()

postRouter.put("/updatePost/:postId", [
    check("body", "Тело поста не может быть пустым").trim().notEmpty(),
    check("tags", "Укажите хотя бы 1 тег").isLength({min: 1}),
    authMiddleware
], updatePost)

postRouter.delete("/deletePost/:postId", authMiddleware, deletePost)

postRouter.get("/all/:page", getAllPosts)

module.exports = postRouter
