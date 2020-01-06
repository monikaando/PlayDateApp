const express = require("express");
const app = express();
const Caretaker = require("../models/Caretaker");
const createError = require('http-errors');
const url = require("url");

app.get("/addcaretaker", (req, res) => {
    res.render("friends/addcaretaker");
});
app.post("/addcaretaker", (req, res, next) => {
    Caretaker.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        availabledays: req.body.availabledays,
        relation: req.body.relation,
        phone: req.body.phone,
        email: req.body.email
        })
        .then(() => res.redirect("/"))
        .catch(error => {
            console.log(error);
            next(createError(500, "Sorry! Our database crashed. Please come back later."));
    });
});
        
  

module.exports = app;