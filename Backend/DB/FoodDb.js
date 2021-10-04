const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    dish_name: {
        type: String,
        required: true,
      },

    description: {
        type : String,
        required : true,
    },
    category : {
        type : String,
        required : true,
    },
    image_path:{
        type : String,
        required : true
    }
    

})

module.exports = mongoose.model("RestrawFood", FoodSchema);