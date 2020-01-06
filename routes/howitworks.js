const express = require("express");
const app = express();

app.get("/how-it-works", (req, res) => {
    res.render("user/howitworks");
});

module.exports = app