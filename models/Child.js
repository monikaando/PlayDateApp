const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const childSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    profile_pic: { type: String, default: '/images/default_user.png' },
    birthday: { type: Date },
    availabledays: [{ type: String }],
    foodlikes: { type: [String] },
    fooddislikes: { type: [String] },
    allergies: { type: [String] },
    activitylikes: { type: [String] },
    activitydislikes: { type: [String] },
    caretakers: { type: [Schema.Types.ObjectId] } // add rel later
});

const Child = mongoose.model("children", childSchema);
module.exports = Child;