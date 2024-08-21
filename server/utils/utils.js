const {validationResult} = require("express-validator");
const {jwtRefreshLive} = require("../config/config")
const APIError = require("./error");
const Token = require("../models/Token");
const User = require("../models/User");

const utils = {
    maxRefreshTokenAge: Number(jwtRefreshLive.replace("d", "")) * 24 * 60 * 60 * 1000
};

utils.catchErrors = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return next(APIError.BadRequests("Ошибка валидации", errors.array()))
};
utils.unique = (arr) => Array.from(new Set(arr));
utils.findUserWithId = async (id, next) => {
    try {
        return await User.findOne({_id: id});
    } catch (e) {
        next(APIError.NotFound("Такого пользователя не существует"));
    }
};
utils.me = async (req, res, next) => {
    try {
        const getMe = await Token.findOne({refreshToken: req.cookies.refreshToken});
        return await User.findOne({_id: getMe.userId});
    } catch (e) {
        next(e);
    }
};
utils.arrayPagination = (posts, page) => Array(...posts).slice(10 * page - 10, 10 * page)
utils.arrayElemsToLowerCase = (arr) => arr.map((el) => el.toLowerCase())
utils.arrayElemsToString = (arr) => arr.map((el) => el.toString())

module.exports = utils