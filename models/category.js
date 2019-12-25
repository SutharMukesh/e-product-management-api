var mongoose = require('mongoose');

let subcategory = new mongoose.Schema({
    "name": {
        type: String,
        required: true,
        unique: true
    },
    "root": {
        default: false
    },
    "child": [subcategory]
})
let category = new mongoose.Schema({
    "name": {
        type: String,
        required: true,
        unique: true
    },
    "root": {
        type: Boolean,
        required: true
    },
    "child": [subcategory]
})

module.exports = mongoose.model('category', category);