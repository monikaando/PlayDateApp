const express = require("express");
const app = express();
const Child = require("../models/Child");
const createError = require('http-errors');

app.get("/addfriend", (req, res) => {
    res.render("friends/addfriend");
});
app.post("/addfriend", (req, res, next) => {
    Child.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            birthday: req.body.birthday,
            address: req.body.address,
            availabledays: req.body.availabledays,
            foodlikes: req.body.foodlikes.split(","),
            fooddislikes: req.body.fooddislikes.split(","),
            allergies: req.body.allergies.split(","),
            activitylikes: req.body.activitylikes.split(","),
            activitydislikes: req.body.activitydislikes.split(","),
        })
        .then((child) => {
            req.session.childID = child._id
            res.redirect("/friends/friendphoto")
        })
        .catch(error => {
            console.log(error);
            next(createError(500, "Sorry! Our database crashed. Please come back later."));
        });
});

module.exports = app;