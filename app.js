const express = require("express");
const hbs = require("hbs")
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const app = express();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const createError = require('http-errors')
const session = require('express-session')
require("dotenv").config();

let options = {
    useNewUrlParser: true,
    useUnifiedTypology: true
}

//OFFLINE DATABASE
// mongoose.connect("mongodb://localhost:27017/playdate", options, (err, connectionInfo) => {
//     if (err) console.log(err);
//     else console.log("connected to database");
// })

// ONLINEDATABASE
mongoose.connect(process.env.db, options, (err, connectionInfo) => {
    if (err) console.log(err);
    else console.log("connected to database");
})

mongoose.set('useFindAndModify', false);
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'hbs');
var sessionOptions = {
    secret: 'keyboard cat',
    cookie: {}
}

app.use(session(sessionOptions));
app.set("views", __dirname + "/views");
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));

app.use((req, res, next) => {
    if (req.session.currentUser) {
        res.locals.user = req.session.currentUser;
    }
    next();
});
app.get('/', (req, res, next) => {
    res.render('index');
});
app.use("/", require("./routes/signup"));
app.use("/", require("./routes/login"));
app.use("/", require("./routes/howitworks"));

app.use("/user", protect, require("./routes/user"));
app.use("/user", protect, require("./routes/deleteuser"));
app.use("/user", protect, require("./routes/edituser"));

app.use("/friends", require("./routes/addfriend"));
app.use("/friends", require("./routes/editfriend"));
app.use("/friends", require("./routes/friendphoto"));
app.use("/friends", require("./routes/addcaretaker"));
app.use("/friends", require("./routes/editcaretaker"));
app.use("/friends", require("./routes/friendslist"));

app.use("/day", require("./routes/day"));

app.use("/", (req, res, next) => {
    next(createError(404, "Page not found"));
})

app.use((err, req, res, next) => {
    console.log(err);
    res.render("error", err);
})

app.listen(3000, () => {
    console.log("Webserver is listening");
})

// app.listen(process.env.PORT, () => {
//     console.log("Webserver is listening");
// });

// install:
// npm init -y
// npm install mongoose express hbs body-parser express-session http-errors mongoose-bcrypt cloudinary multer-storage-cloudinary multer dotenv --s
// sudo npm install nodemon -g

//run:
//nodemon app.js
//nodemon --inspect app.js
//updating also hbs files
//nodemon app.js -e“js hbs”