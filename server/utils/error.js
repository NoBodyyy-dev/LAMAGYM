module.exports = class APIError extends Error {
    status
    errors

    constructor(status, message, errors = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static OK(message) {
        return new APIError(200, message)
    }

    static BadRequests(message, error = []) {
        return new APIError(400, message, error)
    }

    static UnauthorizedError() {
        return new APIError(401, "Пользователь не авторизован")
    }

    static ForbiddenError(message) {
        return new APIError(403, message)
    }

    static NotFound(message) {
        return new APIError(404, message)
    }

    static ServerError(message, error = []) {
        return new APIError(500, message, error)
    }
}
