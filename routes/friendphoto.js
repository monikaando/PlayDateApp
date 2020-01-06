const express = require("express");
const app = express();
const Child = require("../models/Child");
const multer = require("multer");
var upload = multer({ dest: 'uploads/' });
const createError = require('http-errors');

app.get("/friendphoto", (req, res) => {
    res.render("friends/friendphoto");
});

app.post("/friendphoto", upload.single("profile_pic"), function(req, res) {
    Child.findByIdAndUpdate(req.session.childID, {
            profile_pic: req.file.filename
        })
        .then(() => {
            delete req.session.childID;
            res.redirect("/friends/addcaretaker");
        })
        .catch(err => console.log(err));
});

module.exports = app;