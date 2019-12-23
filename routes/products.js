var express = require('express')
var prodroute = express.Router()


prodroute.post('/all', function (req, res) {
    res.send('Gets all products from category')
})

prodroute.post('/add', function (req, res) {
    // only by Supervisor
    res.send('Add a product to category')
})

prodroute.post('/update', function (req, res) {
    // only by Supervisor
    res.send('update prod details')
})

module.exports = prodroute