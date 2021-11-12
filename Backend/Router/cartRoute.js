const express = require('express');
let cartRoute = express.Router();
const CardDB = require('../DB/CartDB');
const FoodDB = require('../DB/FoodDb');
const mongoose = require("mongoose");


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
    const cartdb = new CardDB({
        userID : userid,
        productID : req.body.productID,
        quantity : req.body.quantity
    })
    const data = await cartdb.save();
    console.log(data);
    res.send("ok"); 
})

cartRoute.post('/displayCartProduct',(req,res) => {
    var userid;

    session = req.session;
   cookieid = req.body.cookieid;
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
            }
        },
        
        ]).exec(function(err, results){
            console.log(results.length);
            res.send(results);
         })
       
   }
})




module.exports = cartRoute;