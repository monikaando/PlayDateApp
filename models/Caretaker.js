const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const caretakerSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    availabledays: [{ type: String }],
    relation: { type: String },
    address: { type: String },
    phone: { type: String, required: false, validate: /^((\+|00(\s|\s?\-\s?)?)31(\s|\s?\-\s?)?(\(0\)[\-\s]?)?|0)[1-9]((\s|\s?\-\s?)?[0-9])((\s|\s?-\s?)?[0-9])((\s|\s?-\s?)?[0-9])\s?[0-9]\s?[0-9]\s?[0-9]\s?[0-9]\s?[0-9]$/ },
    email: { type: String, required: true } //find a pattern
})

const Caretaker = mongoose.model("caretakers", caretakerSchema);
module.exports = Caretaker;