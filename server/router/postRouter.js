const Router = require("express")
const postRouter = new Router()
const {createPost, getAllPosts} = require("../controllers/postController")
const {check} = require("express-validator")

postRouter.post("/createPost", [
    check("body", "Тело поста не может быть пустым").trim().notEmpty(),
    check("images", "Слишком много фотографий").isLength({max: 10}),
    check("tags", "Укажите хотя бы 1 тег").isEmpty()
], createPost)
postRouter.get("/all", getAllPosts)

module.exports = postRouter
