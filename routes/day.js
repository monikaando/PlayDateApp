const express = require("express");
const app = express();
const Child = require("../models/Child");
const Caretaker = require("../models/Caretaker");
const createError = require('http-errors');

app.get("/:day", (req, res) => {
    debugger;
    Child.find({availabledays: req.params.day})
    .then(friendsResults => {
        req.session.friends = friendsResults;
        Caretaker.findOne({availabledays: req.params.day})
    })
    .then(caretaker => {
        res.render("friends/friendslist", {friends: req.session.friends, caretaker});
    })
    .catch(error => {
        next(error);
    });
});





module.exports = app;