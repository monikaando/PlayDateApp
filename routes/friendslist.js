const express = require("express");
const app = express();
const Child = require("../models/Child");
const createError = require('http-errors');

app.get("/", (req, res) => {
    Child.find({})
    .then(friends => {    
    res.render("friends/friendslist", {friends});
})
.catch(error => {
    next(error);
});
});

app.get("/:id", (req, res) => {
    Child.findById(req.params.id)
    .populate("caretaker")
    .then(friend => res.render("friends/friend", {friend}))
    .catch(err => console.log(err));
    });

module.exports = app;