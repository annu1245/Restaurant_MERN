const { application } = require('express');
const express = require('express');
const route = express.Router();
const Food = require('../DB/FoodDb');

route.get('/', (req,res)=>{
    res.send("helololloolooo");
})

route.post('/store', async(req,res)=>{
    image = req.files.img;
    location = './uploads/'+ image.name;

    const food = new Food({
        dish_name : req.body.dish,
        description : req.body.description,
        category : req.body.category,
        image_path : location, 
    })

    const data = await food.save();
    console.log(data);
    res.send(data);
})

route.get('/display', (req,res)=>{
    Food.find({}, (err,data)=>{
        if (err){
            console.log(err)
        }
        else{
            console.log(data);
            res.send(data)
        }
    })
})


module.exports = route;