const express = require("express");
const app = express();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const createError = require('http-errors')

app.get("/signup", (req, res) => {
    res.render("user/signup");
})

app.post("/signup", (req, res, next) => {

    bcrypt.hash({}, 10, function(err, hash) {
        if (err) return next(createError(500, "Hashing failed. Trying to hack us?"));
        // Store hash in your password DB.
        User.create({
                username: req.body.username,
                password: hash
            })
            .then((user) => {
                res.redirect("user/login");
            })
            .catch((error) => {
                next(createError(500, "Our database crashed. Please come back later."))
            })
    });
})

module.exports = app;