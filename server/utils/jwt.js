const jwt = require('jsonwebtoken');

const {accessSecret, refreshSecret, jwtAccessLive, jwtRefreshLive} = require("../config/config")
const Token = require("../models/Token")

const util = {};

util.generateToken = (payload) => {
    const accessToken = jwt.sign(payload, accessSecret, {expiresIn: jwtAccessLive})
    const refreshToken = jwt.sign(payload, refreshSecret, {expiresIn: jwtRefreshLive})

    return {accessToken, refreshToken}
}

util.saveToken = async (userId, refreshToken) => {
    const tokenData = await Token.findOne({userId: userId})
    if (tokenData) {
        tokenData.refreshToken = refreshToken
        return tokenData.save()
    }

    return await Token.create({userId, refreshToken});
}

util.removeToken = async (refreshToken) => {
    return Token.deleteOne({refreshToken});
}

util.validateAccessToken = async (token) => {
    try {
        return jwt.verify(token, accessSecret)
    } catch (e) {
        return null
    }
}

util.validateRefreshToken = async (token) => {
    try {
        return jwt.verify(token, refreshSecret)
    } catch (e) {
        return null;
    }
}

util.findToken = async (refreshToken) => {
    return Token.findOne({refreshToken: refreshToken})
}

module.exports = util
