const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        validate: value => value.length > 3 && value.length < 25
    },
    tag: {
        type: String,
        required: true,
        validate: value => value.length == 4
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: value => validator.isEmail(value)
    },
    password: {
        type: String,
        validate: value => validator.isStrongPassword(value),
        required: true,
        select: false
    }
});

module.exports = new mongoose.model('users', userSchema);