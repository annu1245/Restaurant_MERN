const { application } = require('express');
const express = require('express');
const route = express.Router();
const Food = require('../DB/FoodDb');

route.get('/', (req,res)=>{
    console.log("helo")
    res.send("helololloolooo");
})

route.post('/store', async(req,res)=>{
    var location;
    if (!(req.files && req.files.img)){
        if (req.body.img === 'undefined' ){
            location = 'images/defaultImg.jpg'
        }
        else{
            location = req.body.img;
        }
    }
    else {
          image = req.files.img;
          image.mv('./public/images/' + image.name);
          location = 'images/'+ image.name;
    }

   
    options = { upsert: true, new : true, setDefaultsOnInsert: true};
    Food.findOneAndUpdate({dishId:req.body.dishId},
         {
          dish_name : req.body.dish,
          category : req.body.category,
          description : req.body.description,
          image_path : location
        }, 
         options, 
         function(error, result) {
            if(error){
                console.log(error)
            }
            console.log(result)
    });

    console.log(req.body)
    res.send("ok")
})

route.get('/display', (req,res)=>{
    Food.find({}, (err,data)=>{
        if (err){
            console.log(err)
        }
        else{
            res.send(data)
        }
    })
})


route.get('/addFood', (req, res) => {
    session = req.session;
    if (session.userid) {
        console.log(session);
        res.send({status : 1})
    }
    else {
        res.send({status : 0})
    }
})

route.post('/updateFood', (req,res) => {
    const id = req.body.dish
})

route.post('/deleteFood', (req, res) => {
    const id = req.body.foodId;
    console.log(id);
    Food.findByIdAndRemove ({_id : id}, (err)=>{
        if(!err){
            console.log("This is data");
            res.send({status : 1})
        }
        else{
            console.log("nodata")
        }
    })
})





module.exports = route;