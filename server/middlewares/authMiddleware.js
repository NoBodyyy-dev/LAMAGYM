const APIError = require("../utils/error")

const {validateAccessToken} = require("../utils/jwt")

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return next(APIError.UnauthorizedError());

        const accessToken = authHeader.split(' ')[1];
        if (!accessToken) return next(APIError.UnauthorizedError())

        const validateUser = await validateAccessToken(accessToken)
        if (validateUser === null || !validateUser) return next(APIError.UnauthorizedError())

        req.user = validateUser
        next();
    } catch (e) {
        return next(e)
    }
}
// Look At Me And Give Your Money