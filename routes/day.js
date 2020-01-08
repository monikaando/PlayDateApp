const express = require("express");
const app = express();
const Child = require("../models/Child");
const createError = require('http-errors');

app.get("/:day", (req, res) => {
    req.session.day = req.params.day;
    Child.find({createdby: req.session.currentUser._id, availabledays: req.params.day})
    .then(friends => {
        res.render("friends/friendsbyday", {friends});
    })
    .catch(error => {
        next(error);
    });
});

app.get("/detail/:id", (req, res) => {
    Child.findById(req.params.id)
    .populate("caretaker")
    .then(friend => {
        var caretaker = friend.caretaker.filter((x)=> x.availabledays.includes(req.session.day)); 
        res.render("friends/friendbyday", {friend, caretaker});
    })
    .catch(err => console.log(err));
    });



module.exports = app;

