const APIError = require("../utils/error")

const bcrypt = require("bcrypt")

const {
    generateToken,
    saveToken,
    removeToken,
    validateRefreshToken,
    validateAccessToken
} = require("../utils/jwt")
const User = require("../models/User")
const Token = require("../models/Token")
const {maxRefreshTokenAge, unique, catchErrors, arrayElemsToString} = require("../utils/utils")
const UserDto = require("../dto/userDto")
const {compareSync} = require("bcrypt");

const controller = {}

controller.registration = async (req, res, next) => {
    try {
        catchErrors(req, res, next);
        console.log(req.body)

        const {username, email, password, image} = req.body;
        const findUserByUsername = await User
            .findOne()
            .where("username").equals(username);
        const findUserByEmail = await User
            .findOne()
            .where("email").equals(email);

        if (findUserByUsername) return next(APIError.BadRequests("Пользователь с таким именем уже существует"));
        if (findUserByEmail) return next(APIError.BadRequests("Пользователь с таким адресом эл. почты уже существует"));

        const hashPassword = bcrypt.hashSync(password, 7)
        const newUser = await User.create({
            username: username,
            email: email.toLowerCase(),
            password: hashPassword,
            image: image,
        })

        const userData = newUser
        const userDto = new UserDto(newUser)
        const tokens = generateToken({...userDto})
        await saveToken(userDto.id, tokens.refreshToken)
        console.log(tokens)

        res.cookie('refreshToken', tokens.refreshToken, {maxAge: maxRefreshTokenAge, httpOnly: true})

        res.json({userData, tokens})
    } catch (e) {
        next(e)
    }
}

controller.login = async (req, res, next) => {
    try {
        catchErrors(req, res, next);

        const {username, email, password} = req.body;
        const findUserByUsername = await User.findOne({username});
        const findUserByEmail = await User.findOne({email});
        if (!findUserByUsername) return next(APIError.BadRequests("Пользователь с таким именем не найден"));
        if (!findUserByEmail) return next(APIError.BadRequests("Пользователь с таким именем почты не найден"));
        const validPassword = bcrypt.compareSync(password, findUserByUsername.password);

        if (!validPassword) return next(APIError.BadRequests("Неправильно введен пароль"));
        const userData = findUserByUsername;

        const userDto = new UserDto(userData);
        const tokens = generateToken({...userDto});
        await saveToken(userDto.id, tokens.refreshToken);

        res.cookie("refreshToken", tokens.refreshToken, {maxAge: maxRefreshTokenAge, httpOnly: true});

        return res.json({userData, tokens});
    } catch (e) {
        next(e);
    }
}

controller.subOnUser = async (req, res, next) => {
    try {
        const {userName} = req.body;
        const user = req.user;
        const findUser = await User
            .findOne()
            .where("_id").equals(user.id)
        const findGetSubUser = await User
            .findOne()
            .where("username").equals(userName)
        findGetSubUser.countSubscribers++

        const newTags = unique([...findUser.tags, ...findGetSubUser.tags]);
        const newSub = [...findUser.subsOnUsers, findGetSubUser._id];

        findUser.tags = newTags
        findUser.subsOnUsers = newSub
        await Promise.all([findUser.save(), findGetSubUser.save()])

        return res.json(findUser._id)
    } catch (e) {
        next(e);
    }
}

controller.unsubOnUser = async (req, res, next) => {
    try {
        const {userName} = req.body;
        const user = req.user;
        const findUser = await User
            .findOne()
            .where("_id").equals(user.id)
        const findGetSubUser = await User
            .findOne()
            .where("username").equals(userName)
        findGetSubUser.countSubscribers--
        findUser.subsOnUsers = findUser.subsOnUsers.filter((id) => String(id) !== String(findGetSubUser._id))
        await Promise.all([findUser.save(), findGetSubUser.save()])


        return res.json(findGetSubUser._id)
    } catch (e) {
        next(e);
    }
}

controller.logout = async (req, res, next) => {
    try {
        const {refreshToken} = req.cookies
        const token = await removeToken(refreshToken)
        req.header.authorization = null
        res.clearCookie('refreshToken')
        return res.json(token)
    } catch (e) {
        next(e)
    }
}

controller.refresh = async (req, res, next) => {
    try {
        const {refreshToken} = req.cookies;
        if (!refreshToken) return next(APIError.UnauthorizedError());
        const userData = validateRefreshToken(refreshToken);
        const tokenFromDB = await Token
            .findOne()
            .where("refreshToken").equals(refreshToken)
        if (!userData || !tokenFromDB) return next(APIError.UnauthorizedError());

        const {username} = await userData;
        const user = await User
            .findOne()
            .where("username").equals(username)
        const userDto = new UserDto(user);
        const tokens = generateToken({...userDto});
        await saveToken(userDto.id, tokens.refreshToken);

        res.cookie("refreshToken", tokens.refreshToken, {maxAge: maxRefreshTokenAge, httpOnly: true});

        return res.json(tokens);
    } catch (e) {
        next(e);
    }
};


controller.updateUser = async (req, res, next) => {
    try {
        const {image, _id} = req.body
        const user = req.user;
        if (_id === req.user.id ) {
            const updateUser = await User
                .findOne()
                .where("_id").equals(user.id)

            updateUser.image = image
            await updateUser.save()
            console.log(updateUser)
            return res.json(updateUser)
        } else {
            return next(APIError.ForbiddenError(`Пользователь ${req.body.id} не может поменять данные пользователя ${req.user.id}`))
        }
    } catch (e) {
        next(e)
    }
}

controller.getProfileInfo = async (req, res, next) => {
    try {
        const profileInfo = await User
            .findOne()
            .where("username").equals(req.params.username)
            .select("-password")
        return res.json({userData: profileInfo})
    } catch (e) {
        next(e)
    }
}

controller.me = async (req, res, next) => {
    try {
        const user = await req.user
        const findUser = await User
            .findOne()
            .where("_id").equals(user.id)
            .select("-password")
        return res.json(findUser)
    } catch (e) {
        next(e)
    }
};

controller.getAllUsers = async (req, res, next) => {
    try {
        const tokenInfo = await validateAccessToken(req.headers.authorization.split(' ')[1]);
        if (!req.headers.authorization || tokenInfo === null) {
            const allUsers = await User.find()
            return res.json(allUsers.map(user => {
                return {username: user.username, image: user.image}
            }))
        } else {
            const allUsers = await User
                .find()
                .where("_id").equals({$ne: tokenInfo.id})
            return res.json(allUsers.map(user => {
                return {username: user.username, image: user.image}
            }))
        }
    } catch (e) {
        next(e)
    }
}

module.exports = controller
