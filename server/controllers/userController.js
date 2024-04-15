const userService = require("../service/userService");
const UserService = require("../service/userService");

class UserController {
  async registrationFunc(req, res, next) {
    try {
      const { email, password, username } = req.body;
      const userData = await userService.registration(username, email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 3600 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      console.log(e);
    }
  }

  async loginFunc(req, res, next) {
    try {
    } catch (e) {
      console.log(e);
    }
  }

  async logoutFunc(req, res, next) {
    try {
    } catch (e) {
      console.log(e);
    }
  }

  async activateFunc(req, res, next) {
    try {
    } catch (e) {
      console.log(e);
    }
  }

  async refreshFunc(req, res, next) {
    try {
    } catch (e) {
      console.log(e);
    }
  }

  async getAllUsersFunc(req, res, next) {
    try {
      res.json(["123", "456"]);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new UserController();
