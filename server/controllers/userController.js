const APIError = require("../utils/error")

const bcrypt = require("bcrypt")
const {validationResult} = require("express-validator")

const {generateToken, saveToken} = require("../utils/jwt")
const User = require("../models/User")
const {secret} = require("../config/config")
const UserDto = require("../dto/userDto")

const controller = {}

controller.registration = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return next(APIError.BadRequests("Ошибка валидации"), errors.array())

        const {username, email, password, image} = req.body
        const findUserByUsername = await User.findOne({username})
        const findUserByEmail = await User.findOne({email})

        if (findUserByUsername) return next(APIError.BadRequests("Пользователь с таким именем уже существует"), errors.array())
        if (findUserByEmail) return next(APIError.BadRequests("Пользователь с таким адресом эл. почты уже существует"), errors.array())

        const hashPassword = bcrypt.hashSync(password, 7)

        const newUser = await User.create({
            username, email: email.toLowerCase(), password: hashPassword, image
        })

        const userData = newUser
        const userDto = new UserDto(newUser)
        const tokens = generateToken({...userDto})
        await saveToken(userDto.id, tokens.refreshToken)
        const maxAge = Number(process.env.JWT_LIVE.replace("d", "")) * 24 * 60 * 60 * 1000
        res.cookie('refreshToken', tokens.refreshToken, {maxAge: maxAge, httpOnly: true, secure: true})
        res.cookie('test', "test", {maxAge: 1000 * 60, httpOnly: true, secure: true})
        
        res.json({userData, tokens})
    } catch (e) {
        next(e)
    }
}

controller.login = async (req, res, next) => {
    try {
        const {username, email, password} = req.body
        const findUserByUsername = await User.findOne({username})
        const findUserByEmail = await User.findOne({email})
        if (!findUserByUsername) return next(APIError.BadRequests("Пользователь с таким именем не найден"))
        if (!findUserByEmail) return next(APIError.BadRequests("Пользователь с таким именем почты не найден"))

        const validPassword = bcrypt.compareSync(password, findUserByUsername.password)
        if (!validPassword) return next(APIError.BadRequests("Неправильно введен пароль"))
        const userData = findUserByUsername
        const useDto = new UserDto(userData)
        const tokens = generateToken({...useDto})
        await saveToken(useDto.id, tokens.refreshToken)

        const maxAge = Number(process.env.JWT_LIVE.replace("d", "")) * 24 * 60 * 60 * 1000
        res.cookie("refreshToken", tokens.refreshToken, {maxAge: maxAge, httpOnly: true, secure: true})
        res.cookie("test", "test", {maxAge: 1000 * 60, httpOnly: true, secure: true})

        return res.json({userData, tokens})
    } catch (e) {
        next(e)
    }
}

controller.logout = async (req, res, next) => {
    try {
        const {refreshToken} = req.cookies
        // const token = await
    } catch (e) {

    }
}

controller.getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await User.find()
        res.json(allUsers)
    } catch (e) {
        next(e)
    }
}

module.exports = controller
