module.exports = async (req, res, next) => {
    try {
        const user = await req.user;
        if (user.role === 'User') req.access = false
        req.access = true
        next()
    } catch (e) {
        next(e);
    }
}