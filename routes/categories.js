var express = require('express')
var catroute = express.Router()
let category = require('../models/category');
const auth = require("../middleware/auth");

catroute.get('/all', auth, async function (req, res) {
    try {
        res.send(await category.find())
    } catch (error) {
        res.status(400).send(`Error while get category: ${error}`);
    }
})

catroute.post('/add', auth, async function (req, res) {
    try {
        // Admin can add root as well as subcategory
        // only root categorsy are added by admin
        if (req.body.parent_id[0] == "root") {
            console.log(`Creating root category`)
            if (req.user.role == "Admin") {
                cat = new category(req.body);
                await cat.save();
                res.status(200).send('Root Category Added')
            } else {
                console.log(`You are not allowed to create root categories`)
                res.status(400).send(`You are not allowed to create root categories: role: ${req.user.role}`)
            }
        } else {
            cat = new category(req.body);
            await cat.save();
            res.status(200).send(`Subcategory Added by role: ${req.user.role}`);
        }
    } catch (error) {
        res.status(400).send(`Error while add category: ${error}`);
    }
})

module.exports = catroute