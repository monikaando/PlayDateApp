const express = require("express")
const app = express()
const Caretaker = require("../models/Caretaker")
const mongoose = require("mongoose")

app.get("/editcaretaker/:id", (req, res) => {
    Caretaker.findById(req.params.id)
        .then((caretaker) => {

            let weekDays = {
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: false
            }

            if (caretaker.availabledays) {
                caretaker.availabledays.forEach((weekDay) => {
                    weekDays[weekDay] = true;
                })
            }

            let caretakerCopy = {...caretaker._doc };
            caretakerCopy.availabledays = weekDays;
            caretakerCopy.id = caretaker.id;

            res.render("friends/editcaretaker.hbs", {
                caretaker: caretakerCopy
            })

        })
        .catch(err => console.log(err))
})


app.post("/editcaretaker/:id", (req, res) => {
    let caretakerId = req.params.id
    let updatedCaretaker = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        availabledays: req.body.availabledays || [],
        relation: req.body.relation,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        createdby: req.session.currentUser.id
    }
    Caretaker.findByIdAndUpdate(caretakerId, updatedCaretaker, { new: true })
        .then((newCaretaker) => {
            res.redirect(`/friends/${newCaretaker.id}`)
        })
        .catch(err => console.log(err))
})


module.exports = app