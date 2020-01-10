const express = require("express")
const app = express()
const User = require("../models/User")
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const bcryptSalt = 10;

app.get("/edituser", (req, res) => {
    res.render("user/edituser.hbs");
})

app.post("/edituser", (req, res) => {
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(req.body.password, salt);
    User.findByIdAndUpdate(req.session.currentUser._id, {password: hashPass})
    .then(() => {
        req.session.destroy();
    })
    .then(()=> 
    res.render("user/login.hbs")
    )   
    .catch(err => console.log(err))
})

module.exports = app;


