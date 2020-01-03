const express = require("express");
const app = express();
const Child = require("../models/Child");
const multer = require("multer");
var upload = multer({ dest: 'uploads/' });
const createError = require('http-errors');

var firstname;
var lastname;

app.get("/friendphoto", (req, res) => {
firstname = req.query.firstname;
lastname = req.query.lastname;
res.render("friends/friendphoto");
});

app.post("/friendphoto", upload.single("profile_pic"), function (req, res) {
    Child.findOneAndUpdate({firstname: firstname, lastname: lastname}, {
        profile_pic: req.file.filename
    })
    .then(() => {
        res.redirect("/friends/addcaretaker");})
    .catch(err => console.log(err));
    });

module.exports = app;