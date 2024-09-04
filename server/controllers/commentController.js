const APIError = require('../utils/error');
const {catchErrors} = require("../utils/utils")

const Comment = require('../models/Comment');
const Post = require('../models/Post');

const controller = {}

controller.createComment = async (req, res, next) => {
    try {
        catchErrors(req, res, next)

        const {postId} = req.params
        const {text} = req.body;
        const user = req.user
        console.log("<<", text);
        console.log(">>", postId);

        const findPost = await Post
            .findOne()
            .where("_id").equals(postId)
        console.log(findPost)

        const createComment = new Comment({
            user: user.id,
            postId: postId,
            text: text,
        })

        createComment && findPost.comments.push(createComment._id)

        await Promise.all([findPost.save(), createComment.save()])

        return res.json({comment: createComment})
    } catch (e) {
        next(e)
    }
}

controller.updateComment = async (req, res, next) => {
    try {
        catchErrors(req, res, next)

        const {commentId} = req.params;
        const {text} = req.body;
        const findComment = await Comment.findOne({_id: commentId})

        if (findComment.userId.toString() === req.user.id) {
            findComment.text = text;

            await findComment.save()
            return res.json(findComment)
        } else {
            return next(APIError.ForbiddenError(`Пользователь ${user.id} не является создателем комментария ${commentId}`))
        }
    } catch (e) {
        next(e)
    }
}

controller.deleteComment = async (req, res, next) => {
    try {
        const {commentId} = req.params;
        const findComment = await Comment.findOne({_id: commentId})
        if (findComment.userId.toString() === req.user.id) {
            await Comment.deleteOne({_id: commentId})
            return next(APIError.OK("Комментарий успешно удален"))
        } else {
            return next(APIError.ForbiddenError(`Пользователь ${user.id} не является создателем комментария ${commentId}`))
        }
    } catch (e) {
        next(e)
    }
}

controller.getPostComment = async (req, res, next) => {
    try {
        const findComments = await Comment
            .find()
            .where("postId").equals(req.params.postId)
            .populate("user", "username image role")

        return res.json({comments: findComments})
    } catch (e) {
        next(e)
    }
}

module.exports = controller
