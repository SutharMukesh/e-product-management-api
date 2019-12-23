var express = require('express')
var catroute = express.Router()

catroute.get('/all', function (req, res) {
    res.send('Gets all category')
})

catroute.post('/add', function (req, res) {
    // only by Admin
    res.send('Add a category')
})

module.exports = catroute