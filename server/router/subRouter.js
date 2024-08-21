const Router = require("express")
const {createSub, getUserSubs, updateSub} = require("../controllers/subController")
const {check} = require("express-validator")
const authMiddleware = require("../middlewares/authMiddleware")

const subRouter = new Router()

subRouter.post("/createSub", [
    check("title", "Название подписки не должно быть пустым").trim().notEmpty(),
    check("description", "Тело подписки не должно быть пустым").trim().notEmpty(),
    check("price", "Стоимость подписки меньше минимальной ставки").isInt({min: 100}),
    authMiddleware
], createSub)

subRouter.put("/updateSub/:subId", [
    check("title", "Название подписки не должно быть пустым").trim().notEmpty(),
    check("description", "Тело подписки не должно быть пустым").trim().notEmpty(),
    check("price", "Стоимость подписки меньше минимальной ставки").isInt({min: 100}),
    authMiddleware
], updateSub)

subRouter.get("/subsUser/:name", getUserSubs)

module.exports = subRouter
