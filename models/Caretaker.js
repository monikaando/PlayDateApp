const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    profile_pic: { type: String, default: '/images/default_user.png' },
    availabledays: [{ type: String, enum:[monday, tuesday, wednesday, thursday, fruday, saturday, sunday] }],
    relation: { type: String, enum: ['mother', 'father', 'sister', 'brother', 'baby sitter', 'other'] },
    phone: { type: String, required: false, validate: /^\d{10}$/ },
    email: { type: String, required: true },
})

const Caretaker = mongoose.model("Caretakers", userSchema);
module.exports = Caretaker;