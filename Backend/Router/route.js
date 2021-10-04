const { application } = require('express');
const express = require('express');
const route = express.Router();

const Food = require('../DB/FoodDb');

route.get('/', (req,res)=>{
    res.send("helololloolooo");
})

route.post('/store', (req,res)=>{
    console.log(req.body.dish);
    console.log(req.files.img);
    image = req.files.img;
    location = './uploads/'+ image.name;
    image.mv(location);
    res.send("yes");

    const food = new Food({
        
    })
})


module.exports = route;