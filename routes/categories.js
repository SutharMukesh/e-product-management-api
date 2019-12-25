var express = require('express')
var catroute = express.Router()
let category = require('../models/category');

catroute.get('/all',async function (req, res) {
    try {
        res.send(await category.find())
    } catch (error) {
        res.status(400).send(`Error while get category: ${error}`);
    }
})

catroute.post('/add', async function (req, res) {
    // only by Admin
    try {
        cat = new category(req.body);
        await cat.save()
        res.status(200).send('Add a category')
    } catch (error) {
        res.status(400).send(`Error while add category: ${error}`);
    }
})

module.exports = catroute