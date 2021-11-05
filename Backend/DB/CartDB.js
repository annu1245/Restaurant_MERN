const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userID : {
        type : String
    },
    productID : {
        type : String
    },
    quantity : {
        type : Number
    }
})

module.exports = mongoose.model('Cart', cartSchema);