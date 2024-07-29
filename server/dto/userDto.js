module.exports = class UserDto {
    id;
    username;
    role;
    banned;

    constructor(model) {
        this.id = model._id
        this.username = model.username
        this.role = model.role
        this.banned = model.banned
    }
}
