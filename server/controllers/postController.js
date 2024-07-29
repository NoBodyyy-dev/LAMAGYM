const APIError = require("../utils/error")

const Post = require("../models/Post")
const User = require("../models/User")
const {catchErrors, arrayElemsToLowerCase, unique} = require("../utils/utils")
const {validateAccessToken} = require("../utils/jwt")

const controller = {}

controller.createPost = async (req, res, next) => {
    try {
        catchErrors(req, res, next)

        const {body, images, tags} = req.body
        const user = req.user
        const newTags = arrayElemsToLowerCase(tags)
        const updateTags = await User.findOne({_id: user.id})
        updateTags.tags = unique([...updateTags.tags, ...newTags])
        await updateTags.save()

        const create = await Post.create({
            userId: user.id,
            userName: user.username,
            body,
            images,
            tags: newTags
        })

        return res.json({post: create})
    } catch (e) {
        next(e)
    }
}

controller.likePost = async (req, res, next) => {
    try {
        const findUser = await User.findOne({_id: req.user.id})
        const findPost = await Post.findOne({_id: req.body.postId})
        findPost.countLikes-- ? findUser.likedPosts.contains(req.body.postId) : findPost.countLikes++

        findPost.save()
        return res.json(findPost)
    } catch (e) {
        next(e)
    }
}

controller.updatePost = async (req, res, next) => {
    try {
        catchErrors(req, res, next)

        const {body, tags} = req.body
        const {postId} = req.params

        const findPost = await Post.findOne({_id: postId})

        if (findPost.userId.toString() === req.user.id) {
            findPost.body = body
            findPost.tags = arrayElemsToLowerCase(tags)

            await findPost.save()
            return res.json(findPost)
        } else {
            return next(APIError.ForbiddenError(`Пользователь ${req.user.id} не является создателем поста ${postId}`))
        }
    } catch (e) {
        next(e)
    }
}

controller.deletePost = async (req, res, next) => {
    try {
        const {postId} = req.params
        const findPost = await Post.findOne({_id: postId})
        if (!findPost) return next(APIError.NotFound())
        if (findPost.userId.toString() === req.user.id) {
            await Post.deleteOne({_id: postId})
            return next(APIError.OK("Пост успешно удален"))
        } else {
            return next(APIError.ForbiddenError(`Пользователь ${req.user.id} не является создателем поста ${postId}`))
        }
    } catch (e) {
        next(e)
    }
}

controller.getAllPosts = async (req, res, next) => {
    try {
        const page = Number(req.params.page)
        let allPosts;
        console.log('GET ALL POSTS', req.headers)
        if (!req.headers.authorization) allPosts = await Post.find().sort('-countLikes').sort('-created').limit(10);
        else {
            const tokenInfo = await validateAccessToken(req.headers.authorization.split(' ')[1])
            console.log(tokenInfo)
            const getMe = await User.findOne({_id: tokenInfo.id})
            console.log(getMe)
            if (!getMe.subsOnUsers.length)
                allPosts = await Post.find().sort('-countLikes').sort('-created').limit(10 * page);
            else
                allPosts = await Post.find({
                    userId: {$in: getMe.subsOnUsers},
                    tags: {$elemMatch: {$in: getMe.tags}}
                }).sort('-created').limit(10 * page);
        }
        return res.json({posts: allPosts});
    } catch (e) {
        next(e);
    }
};

controller.getUserPosts = async (req, res, next) => {
    try {
        const userPosts = await Post.find({userId: req.params.userId})
        if (!userPosts) return APIError.NotFound()
        return res.json(userPosts)
    } catch (e) {
        next(e)
    }
}

module.exports = controller
