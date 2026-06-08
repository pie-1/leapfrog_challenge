const mongoose = require('mongoose');

// define score schema

const scoreSchema = new mongoose.Schema({
    playerName : {type:String, required:true},
    score : {type:Number, required : true},
    date : {type:Date, default: Date.now}
});

module.exports = mongoose.model('Score', scoreSchema);