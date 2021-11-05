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

module.exports = cartRoute;