const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mailService");
const tokenService = require("./tokenService");
const UserDto = require("../dtos/userDto");

class UserService {
  async registration(username, email, password) {
    const checkUser = await UserModel.findOne({ email });
    if (checkUser) {
      throw new Error(`Пользователь с адресом почты ${email} уже существует`);
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const createUser = await UserModel.create({
      username,
      email,
      password: hashPassword,
      activationLink,
    });

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/token/activate/${activationLink}`
    );

    const userDto = new UserDto(createUser);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    console.log({ ...tokens, user: createUser });

    return { ...tokens, user: userDto };
  }
}

module.exports = new UserService();
