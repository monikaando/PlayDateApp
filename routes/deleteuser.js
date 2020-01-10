const express = require("express");
const app = express();
const Child = require("../models/Child");
const cloudinary = require('cloudinary');
const Caretaker = require("../models/Caretaker");
const User = require("../models/User");

app.get("/deleteuser", (req, res) => {
    res.render("user/deleteuser.hbs");
});

app.get("/deleteuser/confirm", (req, res) => {
    Child.find({ createdby: req.session.currentUser._id })
        .then((children) => {
            var promises = [];
            for (i = 0; i < children.length; i++) {
                promises.push(cloudinary.uploader.destroy(children[i].profile_pic));
            }
            Promise.all(promises);
        })
        .then(() => Child.deleteMany({ "createdby": req.session.currentUser._id }))
        .then(() => Caretaker.deleteMany({ "createdby": req.session.currentUser._id }))
        .then(() => User.findByIdAndDelete(req.session.currentUser._id))
        .then(() => req.session.destroy())
        .then(() => res.redirect(`/`))
        .catch(err => console.log(err));
});

module.exports = app;