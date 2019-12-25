var express = require('express')
var prodroute = express.Router()
let product = require('../models/product');
let category = require('../models/category');
const auth = require("../middleware/auth");

prodroute.get('/:category_id', auth, async function (req, res) {
    try {
        if (req.params.category_id == "all") {
            products = await product.find({})
        } else {
            products = await category.find({ "parent_id": { $eq: req.params.category_id } }, { _id: 1 })
            catids = [req.params.category_id]
            products.map((id) => catids.push("" + id._id))
            products = await product.find({ category: { $in: catids } })
        }
        res.status(200).send(products)
    } catch (error) {
        res.status(400).send(`Error while finding product: ${error}`);
    }
})

prodroute.post('/add', auth, async function (req, res) {
    try {
        // only by Supervisor
        if (req.user.role == "Supervisor") {
            newprod = new product(req.body)
            result = await newprod.save()
            console.log(result)
            res.status(200).send('Added product successfully')
        } else {
            res.status(400).send(`You cant add product, role: ${req.user.role}`)
        }
    } catch (error) {
        res.status(401).send(`Error while inserting product: ${error}`)
    }
})

prodroute.post('/update', auth, async function (req, res) {
    // only by Supervisor
    try {
        if (req.user.role == "Supervisor") {
            newprod = new product(req.body.data);
            await product.updateOne({ _id: req.body._id }, req.body.data, { runValidators: true })
            res.status(200).send('update prod details')
        } else {
            res.status(400).send(`You cant update product, role: ${req.user.role}`)
        }
    } catch (error) {
        res.status(400).send(`Error while updating prod: ${error}`)
    }
})

prodroute.delete('/:id', auth, async function (req, res) {
    // only by Supervisor
    try {
        if (req.user.role == "Supervisor") {
            result = await product.deleteOne({ _id: req.params.id })
            console.log(result)
            res.send(`delete prod details: ${JSON.stringify(result)}`)
        } else {
            res.status(400).send(`You cant delete product, role: ${req.user.role}`)
        }
    } catch (error) {
        res.status(400).send(`Error while deleting: ${error}`)
    }
})

module.exports = prodroute