const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const caretakerSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    availabledays: [{ type: String }],
    relation: { type: String },
    phone: { type: String, required: false },
    email: { type: String, required: true }
})

const Caretaker = mongoose.model("caretakers", caretakerSchema);
module.exports = Caretaker;