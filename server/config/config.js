module.exports = {
    port: process.env.PORT,
    socketPort: process.env.SOCKET_PORT,
    dbUrl: process.env.DB_URL,
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    jwtRefreshLive: process.env.JWT_LIVE,
    jwtAccessLive: process.env.JWT_ACCESS_LIVE,
    clientUrl: process.env.CLIENT_URL
}
