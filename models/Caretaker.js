
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const caretakerSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    profile_pic: { type: String, default: '/images/default_user.png' },
    availabledays: [{ type: String }],
    relation: { type: String},
    phone: { type: String, required: false, validate: /^((\+|00(\s|\s?\-\s?)?)31(\s|\s?\-\s?)?(\(0\)[\-\s]?)?|0)[1-9]((\s|\s?\-\s?)?[0-9])((\s|\s?-\s?)?[0-9])((\s|\s?-\s?)?[0-9])\s?[0-9]\s?[0-9]\s?[0-9]\s?[0-9]\s?[0-9]$/ },
    //comment from Monika: /^((\+|00(\s|\s?\-\s?)?)31(\s|\s?\-\s?)?(\(0\)[\-\s]?)?|0)[1-9]((\s|\s?\-\s?)?[0-9])((\s|\s?-\s?)?[0-9])((\s|\s?-\s?)?[0-9])\s?[0-9]\s?[0-9]\s?[0-9]\s?[0-9]\s?[0-9]$/
    //it allows for every type of numbers with and without "-" as well, I tested /^\d{10}$/  it didn't work ;/
    email: { type: String, required: true }
})

const Caretaker = mongoose.model("caretakers", caretakerSchema);
module.exports = Caretaker;