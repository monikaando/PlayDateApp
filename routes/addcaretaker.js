const express = require("express");
const app = express();
const Caretaker = require("../models/Caretaker");
const Child = require("../models/Child");
const createError = require('http-errors');
const mongoose = require("mongoose");

app.get("/addcaretaker", (req, res) => {
    res.render("friends/addcaretaker");
});
app.post("/addcaretaker", (req, res, next) => {
    Caretaker.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            availabledays: req.body.availabledays,
            relation: req.body.relation,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email
        })
        .then((caretaker) => {
            debugger;
            return Child.findByIdAndUpdate(req.session.childID,{
            caretaker: mongoose.Types.ObjectId(caretaker.id)
            });
        })
        .then(()=> {
            delete req.session.childID;
            res.redirect("/");
        })
        .catch(error => {
            console.log(error);
            next(createError(500, "Sorry! Our database crashed. Please come back later."));
        });
});

module.exports = app;