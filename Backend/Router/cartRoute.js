const express = require('express');
let cartRoute = express.Router();
const CardDB = require('../DB/CartDB');

cartRoute.post('/storeOrder', async(req,res) => {
    console.log(req.body);
    const Cart = new CardDB({
        userID : req.body.userId,
        productID : req.body.productId,
        quantity : req.body.quantity
    })
    const data = await Cart.save();
    console.log(data);
    res.send(data);

})

cartRoute.post('/storeItem', async(req,res) => {
    session=req.session;
    cart = new CardDB({
        userID : session.userid,
        productID : req.body.productId,
        quantity : req.body.quantity
    })

    var data = await cart.save();
    console.log(data);
    res.send({status : 1})
})

cartRoute.post('/totalItem', (req,res) => {
    console.log(session.userid)
    CardDB.countDocuments({userID : session.userid}, (err, count) => {
        if (err){
            console.log(err);
        }
        var totalCount = count;
        console.log(totalCount)
        res.send({item : totalCount});
    })
})

module.exports = cartRoute;