const APIError = require("../utils/error");
const {validationResult} = require("express-validator");
const User = require("../models/User");
const Sub = require("../models/Sub");
const {catchErrors} = require("../utils/utils")

const controller = {};
controller.createSub = async (req, res, next) => {
    try {
        catchErrors(req, res, next)

        const {title, description, price, level, subAction} = req.body;
        const user = req.user

        const findUser = await User.findOne({_id: user.id});
        if (level > findUser.subsOwner.length && findUser.subsOwner.length) return next(APIError.BadRequests("Недопустимый уровень подписки"));
        else {
            const newSub = await Sub.create({
                creatorId: user.id,
                title: title,
                description: description,
                price: price,
                level: level,
                subAction: subAction,
            });
            return res.json(newSub);
        }
    } catch (e) {
        next(e)
    }
};

controller.updateSub = async (req, res, next) => {
    try {
        catchErrors(req, res, next)

        const {description, price, subAction} = req.body;
        const {subId} = req.params
        const user = req.user

        const findUser = await User.find({_id: creatorId});
        if (level > findUser.subsOwner.length) return next(APIError.BadRequests("Недопустимый уровень подписки"), errors.array());

        const findSub = await Sub.findOne({_id: subId})
        if (findSub.creatorId === user.id) {
            findSub.description = description
            findSub.price = price
            findSub.subAction = subAction

            await findSub.save()
            return next(APIError.OK("Данные подписки успешно обновлены"))
        } else return next(APIError.ForbiddenError(`Пользователь ${user.id} не является владельцем подписки ${subId}`))
    } catch (e) {
        next(e)
    }
}

controller.getUserSubs = async (req, res, next) => {
    try {
        const {creatorId} = req.params;
        const userSubs = await Sub.find({creatorId: creatorId});
        return res.json(userSubs);
    } catch (e) {
        next(e)
    }
};

module.exports = controller;
