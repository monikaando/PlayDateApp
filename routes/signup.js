const express = require("express");
const app = express();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const bcryptSalt = 10;

app.get("/signup", (req, res) => {
    res.render("user/signup");
});
app.post("/signup", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username === "" || password === "") {
        res.render("user/signup", {
            errorMessage: "Enter your username and password to sign up"
        });
        return;
    }
    User.findOne({ "username": username })
        .then(user => {
            if (user !== null) {
                res.render("user/signup", {
                    errorMessage: "The username already exists!"
                });
                return;
            }

            const salt = bcrypt.genSaltSync(bcryptSalt);
            const hashPass = bcrypt.hashSync(password, salt);
            User.create({
                    username,
                    password: hashPass
                })
                .then(() => {
                    res.redirect("/");
                })
                .catch(error => {
                    next(createError(500, "Sorry! Our database crashed. Please come back later."))
                })
        })
        .catch(error => {
            next(error);
        })

});


module.exports = app;