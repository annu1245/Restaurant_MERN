const express = require('express');
let cartRoute = express.Router();
const CardDB = require('../DB/CartDB');
const FoodDB = require('../DB/FoodDb');
const mongoose = require("mongoose");
const { CardTravelOutlined } = require('@material-ui/icons');


cartRoute.post('/totalItem', (req,res) => {
    var userid;
    session = req.session;
    if (!session.userid){
        userid = req.body.userId
    }
    else {
        userid = session.userid
    }
    if (!userid){
        return res.send({item : null})
    }
    console.log("userid",userid)
    CardDB.countDocuments({userID : userid}, (err, count) => {
        if (err){
            console.log(err);
        }
        var totalCount = count;
        console.log(totalCount)
        res.send({item : totalCount});
    })
})


cartRoute.post('/addProducts', async (req,res) => {
    console.log("this is userid",req.body.userID);
    var userid;
    session = req.session;
    if (!session.userid){
        userid = req.body.userId
    }
    else {
        userid = session.userid
    }
    if (!userid){
        return res.send({item : null})
    }

    options = { upsert: true, new : true, setDefaultsOnInsert: true};
    CardDB.findOneAndUpdate({userID : userid , productID : req.body.productID},
         {
            userID : userid,
            productID : req.body.productID,
            quantity : req.body.quantity
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

cartRoute.post('/displayCartProduct',(req,res) => {
   var userid;
   session = req.session;
   cookieid = req.body.userid;
   if (cookieid){
       userid = req.body.cookieid;
   }
   else if(session){
       userid = session.userid;
   }
   if(userid){
    mongoose.model('Cart').aggregate([
        { "$match": { "userID": userid } },
        {
            $lookup: {
                    from: "restrawfoods",
                    localField: "productID",
                    foreignField: "dishId",
                    as: "foods"
                }
            
        },
        {
            $sort: {
              '_id':-1
            }
        },
        {
            $project : {
                    "_id" : 0,
                    "userID" : 0,
                    "productID" : 0,
            }
        },
        
        ]).exec(function(err, results){
            console.log(results.length);
            res.send(results);
         })    
   }
})

cartRoute.post('/changeQuantity', (req, res) => {
    console.log("this is userid",req.body.userId);
    const quantity = req.body.quantity;
    var userid;
    session = req.session;
    if (!session.userid){
        userid = req.body.userId
    }
    else {
        userid = session.userid
    }
    if (!userid){
        return res.send({item : null})
    }

    const query = {userID : userid, productID : req.body.productId}
    const update = {quantity : req.body.quantity}
    
    CardDB.findOneAndUpdate(query, update,  {new : true}, (err,doc) => {
        console.log(doc)
        return res.send("ok")
    })
})

cartRoute.post('/deleteItem', (req,res) => {
    console.log("this is userid",req.body.userId);
    const productId = req.body.productId;
    var userid;
    session = req.session;
    if (!session.userid){
        userid = req.body.userId
    }
    else {
        userid = session.userid
    }
    if (!userid){
        return res.send({item : null})
    }


    CardDB.findOneAndRemove({
        userID : userid,
        productID : productId,
    }, (err) => {
        if (!err){
            console.log("deleted")
            return res.send("ok");
        }
        else{
            console.log(err);
        }
    })
}) 


module.exports = cartRoute;