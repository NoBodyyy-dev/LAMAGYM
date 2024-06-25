module.exports = class APIError extends Error {
    status
    errors

    constructor(status, message, errors = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static BadRequests(message, error = []) {
        return new APIError(400, message, error)
    }

    static UnauthorizedError() {
        return new APIError(401, "Пользователь не авторизован")
    }

    static ServerError(message, error = []) {
        return new APIError(500, message, error)
    }
}
