const APIError = require('../utils/error');
const Comment = require('../models/Comment');
const {catchErrors} = require("../utils/utils")

const controller = {}

controller.createComment = async (req, res, next) => {
    try {
        catchErrors(req, res, next)

        const {postId, text} = req.body;
        const user = req.user

        const createComment = await Comment.create({
            userId: user.id,
            postId: postId,
            text: text,
        })

        return res.json(createComment)
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
        const findComments = await Comment.find({
            postId: req.params.postId,
        })

        return res.json(findComments)
    } catch (e) {
        next(e)
    }
}

module.exports = controller
