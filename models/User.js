const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    profile_pic: { type: String, default: '/images/default_user.png' },
    guardian: { type: String, enum: ['mother', 'father', 'sister', 'brother', 'baby sitter', 'other'] },
    phone: { type: String, required: false, validate: /^\d{10}$/ },
    email: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
module.exports = User;