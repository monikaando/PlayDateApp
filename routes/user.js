const express = require("express");
const app = express();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const User = require("../models/User");

app.get("/upload-profile-pic", (req, res) => {
    res.render("user/profile-picture");
})

app.post("/upload-profile-pic", upload.single('profile-picture'), (req, res) => {
    User.findByIdAndUpdate(req.session.currentUser._id, {
            profile_pic: req.file.filename
        })
        .then((user) => {
            req.session.currentUser.profile_pic = req.file.filename;
            res.redirect("/user/upload-profile-pic")
        })
        .catch((err) => {
            res.send("err", err)
        })
})
app.delete('/upload-profile-pic', (req, res) => {
    const { username } = req.params;
    db.collection('username').findOneAndDelete({ username: username },
        (err, result) => {
            if (err) return res.send(500, err)
            console.log('got deleted');
            res.redirect('/');
        });
});

module.exports = app;