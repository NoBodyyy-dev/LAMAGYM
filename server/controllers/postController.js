const Post = require("../models/Post")
const {validationResult} = require("express-validator")

const controller = {}

controller.createPost = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({message: "Ошибка при создании поста", errors})

        const {body, images, tags} = req.body
        const create = await Post.create({
            body,
            images,
            tags
        })
        res.json(create)
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Что-то пошло не так"})
    }
}

controller.getAllPosts = async (req, res) => {
    try {
        const allPosts = await Post.find({})
        res.json(allPosts)
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Что-то пошло не так"})
    }
}

module.exports = controller
