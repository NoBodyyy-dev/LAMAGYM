const jwt = require('jsonwebtoken');

const Token = require("../models/Token")

const util = {};

util.generateToken = (payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: process.env.JWT_ACCESS_LIVE})
    const refreshToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: process.env.JWT_LIVE})

    return {accessToken, refreshToken}
}

util.saveToken = async (userId, refreshToken) => {
    const tokenData = await Token.findOne(userId)
    if (tokenData) {
        tokenData.refreshToken = refreshToken
        return tokenData.save()
    }
    return await Token.create({userId, refreshToken});
}

util.removeToken = async (refreshToken) => {
    return Token.deleteOne(refreshToken);
}

// util.verifyToken = () => {
//     jwt.verify()
// }

module.exports = util
