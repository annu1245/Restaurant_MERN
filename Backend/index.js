const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const route = require('./Router/route');
const path = require('path');
const fileUpload = require('express-fileupload');
const logRoute = require('./Router/loginRoute');
const userRoute = require('./Router/userRoute');
const anUserRoute = require('./Router/anUserRoute');
const cartRoute = require('./Router/cartRoute');

const cookieParser = require("cookie-parser");
const sessions = require('express-session');



app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload({
  createParentPath: true
}));

mongoose.connect('mongodb://localhost:27017/FoodDB',
  {
    useNewUrlParser: true,
  }
);
app.use(express.static('public'))
app.use(express.static(path.join(__dirname, "public")));

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  resave: false
}));
app.use(cookieParser());

app.use('/', route);
app.use('/AdminLogin', logRoute);
app.use('/user', userRoute);
app.use('/anuser',anUserRoute);
app.use('/cart', cartRoute)

app.listen(5000, () => {
    console.log("Server is running at port 5000");
  });