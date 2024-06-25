const APIError = require("../utils/error");

module.exports = (error, req, res, next) => {
    console.log(error)
    if (error instanceof APIError) return res.status(error.status).json({message: error.message, errors: error.errors})
    return APIError.ServerError("Ошибка сервера")
}
