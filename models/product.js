var mongoose = require('mongoose');

let product = new mongoose.Schema({
    "name": {
        type: String,
        required:true,
        unique:true
    },
    "price":{
        type:Number,
        required:true
    },
    "category": {
        type: Array
    }
})

module.exports = mongoose.model('product', product)