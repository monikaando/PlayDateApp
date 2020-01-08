const express = require("express")
const app = express()
const Child = require("../models/Child")
const mongoose = require("mongoose")

app.get("/editfriend/:id", (req, res) => {
    Child.findById(req.params.id)
        .then((friend) => {

            let weekDays = {
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: false
            }

            friend.availabledays.forEach((weekDay) => {
                weekDays[weekDay] = true;
            })

            let friendCopy = {...friend._doc }
            friendCopy.availabledays = weekDays;
            debugger
            res.render("friends/editfriend.hbs", {
                friend: friendCopy
            })

        })
        .catch(err => console.log(err))
})


app.post("/editfriend/:id", (req, res) => {
    debugger
    let childId = req.params.id
    let updatedChild = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthday: req.body.birthday,
        address: req.body.address,
        availabledays: req.body.availabledays.split(","),
        foodlikes: req.body.foodlikes.split(","),
        fooddislikes: req.body.fooddislikes.split(","),
        allergies: req.body.allergies.split(","),
        activitylikes: req.body.activitylikes.split(","),
        activitydislikes: req.body.activitydislikes.split(",")
    }

    Child.findByIdAndUpdate(childId, updatedChild, { new: true })
        .then(() => {
            res.redirect(`/friends`)
        })
        .catch(err => console.log(err))
})


module.exports = app