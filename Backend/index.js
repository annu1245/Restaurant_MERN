const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const route = require('./Router/route');
const path = require('path');
const fileUpload = require('express-fileupload');

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

app.use(express.static(path.join(__dirname, "public")));

app.use('/', route);


app.listen(5000, () => {
    console.log("Server is running at port 5000");
  });