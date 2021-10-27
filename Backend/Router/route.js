const { application } = require('express');
const express = require('express');
const route = express.Router();
const Food = require('../DB/FoodDb');

route.get('/', (req,res)=>{
    console.log("helo")
    res.send("helololloolooo");
})

route.post('/store', async(req,res)=>{
    // image = req.files.img;
    // console.log(image)
    if (!(req.files && req.files.image)){
        console.log("null")
    }
    options = { upsert: true, new : true, setDefaultsOnInsert: true};
    // query = {_id: "6178ed22f8ac7eb219069f18"}
    Food.findOneAndUpdate({dish_name:req.body.dish},
         {category : req.body.category}, 
         options, 
         function(error, result) {
        if(error){
            console.log(error)
        }
        console.log(result)
        
    //    if(!result){
    //     result = new Food();
        
    //    }
    //    result.save(function(error){
    //        if(!error){
    //            console.log("yes")
    //        }
    //        else{
    //            console.log(error)
    //        }
    
   
    //    })
        
        
    
        // do something with the document
    });

    // image.mv('./public/images/' + image.name);
    // location = 'images/'+ image.name;
    // var cnt = await Food.collection.count();
    // console.log(cnt);
    // const food = new Food({
    //     dish_name : req.body.dish,
    //     description : req.body.description,
    //     category : req.body.category,
    //     image_path : location, 
    // })

    // const data = await food.save();
    // res.send(data);
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

route.get('/logout', (req,res) => {
    req.session.destroy();
    res.send({status : 1})
})



module.exports = route;