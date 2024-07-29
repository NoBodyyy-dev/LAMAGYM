const APIError = require("../utils/error")

const bcrypt = require("bcrypt")

const {
    generateToken,
    saveToken,
    removeToken,
    validateRefreshToken,
    findToken
} = require("../utils/jwt")
const User = require("../models/User")
const Token = require("../models/Token")
const {maxRefreshTokenAge, findUserWithId, catchErrors} = require("../utils/utils")
const UserDto = require("../dto/userDto")

const controller = {}

controller.registration = async (req, res, next) => {
    try {
        catchErrors(req, res, next);

        const {username, email, password, image} = req.body;
        const findUserByUsername = await User.findOne({username});
        const findUserByEmail = await User.findOne({email});

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
        const {curUserId, userId, tags} = req.body;
        const findUser = await User.findOne({_id: curUserId})
        const newTags = unique([...findUser.tags, ...tags]);
        const newSub = [...findUser.subsOnUsers, userId];

        await User.findOneAndUpdate({_id: userId}, {
            tags: newTags,
            subsOnUsers: newSub
        })
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
        const tokenFromDB = await Token.findOne({refreshToken});
        if (!userData || !tokenFromDB) return next(APIError.UnauthorizedError());

        const {username} = await userData;
        const user = await User.findOne({username: username});
        const userDto = new UserDto(user);
        const tokens = generateToken({...userDto});
        await saveToken(userDto.id, tokens.refreshToken);

        res.cookie("refreshToken", tokens.refreshToken, {maxAge: maxRefreshTokenAge, httpOnly: true});

        return res.json(tokens);
    } catch (e) {
        next(e);
    }
};

controller.getProfileInfo = async (req, res, next) => {
    try {
        const profileInfo = await User.findOne({_id: req.params.id})
        return res.json(profileInfo)
    } catch (e) {
        next(e)
    }
}

controller.me = async (req, res, next) => {
    try {
        const user = await req.user
        console.log(user)
        const findUser = await User.findOne({_id: user.id})
        return res.json(findUser)
    } catch (e) {
        next(e)
    }
};

controller.updateUser = async (req, res, next) => {
    try {
        catchErrors(req, res, next)

        const {username, email, password, image} = req.body
        if (req.params.id === req.user.id) {
            const updateUser = await User.findOneAndUpdate({_id: req.user.id}, {
                username: username,
                email: email,
                password: bcrypt.hashSync(password, 7),
                image: image
            })

            return res.json(updateUser)
        } else {
            return next(APIError.ForbiddenError(`Пользователь ${req.user.id} не может поменять данные пользователя ${req.params.id}`))
        }
    } catch (e) {
        next(e)
    }
}

controller.getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await User.find()
        return res.json(allUsers)
    } catch (e) {
        next(e)
    }
}

module.exports = controller
