const express = require("express");
const app = express();
const Child = require("../models/Child");
const createError = require('http-errors');

app.get("/:day", (req, res) => {
    Child.find({availabledays: req.params.day})
    .populate("caretaker")
    .then(friends => {
        res.render("friends/friendsbyday", {friends});
    })
    .catch(error => {
        next(error);
    });
});

module.exports = app;

// friends.filter((friend)=> returnfriend.caretaker.availabledays.includes(req.params.day)
// ^^  Jurgen's Code for looping through friends and find the caretakers