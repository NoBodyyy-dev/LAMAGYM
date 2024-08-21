const APIError = require("../utils/error");
const {validationResult} = require("express-validator");
const User = require("../models/User");
const Sub = require("../models/Sub");
const {catchErrors} = require("../utils/utils")

const controller = {};
controller.createSub = async (req, res, next) => {
    try {
        catchErrors(req, res, next)

        const {title, description, price, level} = req.body;
        const user = req.user

        const findUser = await User.findOne({_id: user.id});
        if (level > findUser.subsOwner.length + 1 && findUser.subsOwner.length) {
            return next(APIError.BadRequests("Недопустимый уровень подписки"))
        }
        else {
            console.log(findUser.subsOwner.length)
            const newSub = await Sub.create({
                creatorId: user.id,
                creatorName: user.username,
                title: title,
                description: description,
                price: price,
                level: findUser.subsOwner.length + 1,
            });
            findUser.subsOwner.push(newSub._id)
            await findUser.save()
            return res.json(newSub);
        }
    } catch (e) {
        next(e)
    }
};

controller.updateSub = async (req, res, next) => {
    try {
        catchErrors(req, res, next)

        const {description, price, subAction, level} = req.body;
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
        const {name} = req.params;
        const userSubs = await Sub.find({creatorName: name});
        if (userSubs.length) return res.json(userSubs);
        return res.json([]);
    } catch (e) {
        next(e)
    }
};

module.exports = controller;
