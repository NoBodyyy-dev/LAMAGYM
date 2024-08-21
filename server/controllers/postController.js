const APIError = require("../utils/error")

const Post = require("../models/Post")
const User = require("../models/User")
const Tag = require("../models/Tag")
const {catchErrors, arrayElemsToLowerCase, unique, arrayPagination} = require("../utils/utils")
const {validateAccessToken} = require("../utils/jwt")

const controller = {}

controller.createPost = async (req, res, next) => {
    try {
        catchErrors(req, res, next)

        const {body, image, tags, subId} = req.body
        const user = req.user
        const newTags = arrayElemsToLowerCase(tags)
        const findUser = await User.findOne({_id: user.id})
        findUser.tags = unique([...findUser.tags, ...newTags])

        const create = new Post({
            user: user.id,
            userName: user.username,
            body,
            image,
            tags: newTags,
            subId: subId
        })
        console.log(create)

        await Promise.all([findUser.save(), create.save()])

        return res.json({post: create})
    } catch (e) {
        next(e)
    }
}

controller.likePost = async (req, res, next) => {
    try {
        const findPost = await Post.findOne({_id: req.body.postId})
        findPost.countLikes++

        findPost.save()
        return res.json({post: findPost})
    } catch (e) {
        next(e)
    }
}

controller.unLikePost = async (req, res, next) => {
    try {
        const findPost = await Post.findOne({_id: req.body.postId})
        findPost.countLikes--

        findPost.save()
        return res.json({post: findPost})
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
        const postCount = 5
        const validate = req.headers.authorization ? await validateAccessToken(req.headers.authorization.split(' ')[1]) : null
        let allPosts;
        if (validate === null) {
            allPosts = await Post
                .find()
                .sort('-countLikes')
                .sort('-createdAt')
                .limit(10)
                .populate("user", "username image")
                .populate("subId", "title level")
            return res.json({posts: allPosts})
        } else {
            const getMe = await User.findOne({_id: validate.id})
            if (!getMe.subsOnUsers.length) {
                allPosts = await Post
                    .find()
                    .where("user").equals({$ne: validate.id})
                    .sort('-countLikes')
                    .sort('-createdAt')
                    .populate("user", "image role")
                    .populate("subId", "title level")
            } else {
                allPosts = await Post
                    .find(
                        {
                            user: {$ne: getMe._id},
                            tags: {$elemMatch: {$in: getMe.tags}}
                        }
                    )
                    .sort('-countLikes')
                    .sort('-createdAt')
                    .populate("user", "image role")
                    .populate("subId", "title level")
            }
            allPosts = Array(...allPosts).slice(postCount * page - postCount, postCount * page)
            return res.json({posts: allPosts});
        }
    } catch (e) {
        next(e);
    }
};

controller.getAllTags = async (req, res, next) => {
    try {
        const tags = await Tag.find()
        return res.json(tags.map((tag) => tag.tag))
    } catch (e) {
        next(e)
    }
}

controller.getUserPosts = async (req, res, next) => {
    try {
        const page = Number(req.params.page)
        let userPosts = await Post
            .find({userName: req.params.username})
            .sort('-createdAt')
            .populate("user", "image role")
            .populate("subId", "title level")
        userPosts = arrayPagination(userPosts, page)
        if (Array(userPosts).length) return res.json({posts: userPosts})
        return res.json({posts: []})
    } catch (e) {
        next(e)
    }
}

module.exports = controller
