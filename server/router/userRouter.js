const Router = require("express")
const userRouter = new Router()
const {
    getAllUsers,
    registration,
    login,
    logout,
    getProfileInfo,
    refresh,
    me,
    updateUser
} = require("../controllers/userController")
const {findUserWithIdAndUsername} = require("../utils/utils")
const {check} = require("express-validator")
const authMiddleware = require("../middlewares/authMiddleware")

userRouter.post("/register", [
    check("username", "Имя пользователя не может быть пустым").trim().notEmpty(),
    check("email", "Адрес эл. почты не может быть пустым").trim().notEmpty(),
    check("email", "Это не адрес эл. почты").trim().isEmail(),
    check("password", "Пароль должен быть больше 10 и меньше 25 символов").isLength({min: 10, max: 25})
], registration)
userRouter.post("/login", [
    check("username", "Имя пользователя не может быть пустым").trim().notEmpty(),
    check("email", "Адрес эл. почты не может быть пустым").trim().notEmpty(),
    check("email", "Это не адрес эл. почты").trim().isEmail(),
    check("password", "Пароль должен быть больше 10 и меньше 25 символов").isLength({min: 10, max: 25})
], login)
userRouter.post("/logout", logout)

userRouter.put("/updateUser/:id", [
    check("username", "Имя пользователя не может быть пустым").trim().notEmpty(),
    check("email", "Адрес эл. почты не может быть пустым").trim().notEmpty(),
    check("email", "Это не адрес эл. почты").trim().isEmail(),
    check("password", "Пароль должен быть больше 10 и меньше 25 символов").isLength({min: 10, max: 25}),
    authMiddleware
], updateUser)

userRouter.get("/all", getAllUsers)
userRouter.get("/refresh", refresh)
userRouter.get("/profile/:id", getProfileInfo)
userRouter.get('/me', authMiddleware, me)

module.exports = userRouter
