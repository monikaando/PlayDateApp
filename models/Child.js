const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const childSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    profile_pic: { type: String, default: '/images/default_user.png' },
    birthday: { type: Date },
    address: { type: String },
    availabledays: [{ type: String, enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] }],
    foodlikes: { type: [String] },
    fooddislikes: { type: [String] },
    allergies: { type: [String] },
    activitylikes: { type: [String] },
    activitydislikes: { type: [String] },
    caretakers: { type: [Schema.Types.ObjectId] }
});

const Child = mongoose.model("children", childSchema);
module.exports = Child;