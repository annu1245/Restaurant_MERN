const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    dishId : {
        type:String,
        
    },
    dish_name: {
        type: String,
        // required: true,
      },

    description: {
        type : String,
        // required : true,
    },
    category : {
        type : String,
        // required : true,
    },
    image_path:{
        type : String,
        // default : 'images/defaultImg.jpg'
    }
    

})

module.exports = mongoose.model("RestrawFood", FoodSchema);