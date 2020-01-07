const express = require("express");
const app = express();
const Child = require("../models/Child");
const createError = require('http-errors');

app.get("/:day", (req, res) => {
    debugger;
    Child.find({availabledays: req.params.day})
    .then(friends => {
        res.render("friends/friendslist", {friends});
    })
    .catch(error => {
        next(error);
    });
});



module.exports = app;