const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    // name: { type: String, required: true },
    // surname: { type: String, required: true },
    // profile_pic: { type: String, default: '/images/default_user.png' },
    // guardian: { type: String, enum: ['mother', 'father', 'sister', 'brother', 'baby sitter', 'other'] },
    // phone: { type: String, required: false, validate: /^((\+|00(\s|\s?\-\s?)?)31(\s|\s?\-\s?)?(\(0\)[\-\s]?)?|0)[1-9]((\s|\s?\-\s?)?[0-9])((\s|\s?-\s?)?[0-9])((\s|\s?-\s?)?[0-9])\s?[0-9]\s?[0-9]\s?[0-9]\s?[0-9]\s?[0-9]$/ },
    // email: { type: String, required: true },
});
//"users" it is a collection name
const User = mongoose.model("users", userSchema);
module.exports = User;