const express = require("express");
const app = express();
const multer = require('multer');

app.get("/profile", (req, res) => {
    res.render("user/profile");
})

module.exports = app;