const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName : {
        type : String,
        default : true,
    },
    email : {
        type : String,
        default : true,
    },
    password : {
        type : String,
        default : true,
    },
    userType : {
        type : Number,
        default : 0,
    }
})

module.exports = mongoose.model('User', UserSchema);