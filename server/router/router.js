const Router = require("express").Router;
const userController = require("../controllers/userController");
const router = new Router();

router.post("/user/registration", userController.registrationFunc);
router.post("/user/login", userController.loginFunc);
router.post("/user/logout", userController.logoutFunc);
router.post("/token/activate/:link", userController.activateFunc);
router.post("/token/refresh", userController.refreshFunc);

router.get("/user/all", userController.getAllUsersFunc);

module.exports = router;
