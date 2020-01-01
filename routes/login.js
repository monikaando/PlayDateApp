const express = require("express");
const app = express();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const createError = require('http-errors')

app.get("/login", (req, res) => {
    res.render("user/login");
})

app.post("/login", (req, res) => {
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (!user) res.status(403).render("error");
            else {
                bcrypt.compare(req.body.password, user.password, function(err, correct) {
                    if (err) return res.render("error");
                    else if (correct) {
                        req.session.currentUser = user;
                        res.send("Logged in");
                    } else {
                        res.status(403).render("error", err);
                    }
                });
            }
        })
})

app.get("/logout", (req, res) => {
    req.session.destroy(); // delete all data attached to the session
    res.redirect("/")
})
module.exports = app;