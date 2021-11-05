const mongoose = require('mongoose');

const AnUserSchema = mongoose.Schema({
    name : {
        type : String,
    }
})
module.exports = mongoose.model('AnnonimusUser', AnUserSchema);