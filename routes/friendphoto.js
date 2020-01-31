const express = require("express");
const app = express();
const Child = require("../models/Child");
const uploadCloud = require("../config/cloudinary");

app.get("/friendphoto", (req, res) => {
  res.render("friends/friendphoto");
});

app.post("/friendphoto", uploadCloud.single("profile_pic"), function(req, res) {
  debugger;
  Child.findByIdAndUpdate(req.session.childID, {
    profile_pic: req.file.public_id
  })
    .then(() => {
      res.redirect("/friends/addcaretaker");
    })
    .catch(err => console.log(err));
});

module.exports = app;
