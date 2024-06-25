const Router = require("express")
const userRouter = new Router()
const {getAllUsers, registration, login} = require("../controllers/userController")
const {check} = require("express-validator")

userRouter.post("/register", [
    check("username", "Имя пользователя не может быть пустым").trim().notEmpty(),
    check("email", "Адрес эл. почты не может быть пустым").trim().notEmpty(),
    check("email", "Это не адрес эл. почты").trim().isEmail(),
    check("password", "Пароль должен быть больше 10 и меньше 25 символов").isLength({min: 10, max: 25})
], registration)
userRouter.post("/login", login)
userRouter.get("/all", getAllUsers)

module.exports = userRouter
