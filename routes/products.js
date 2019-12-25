let express = require('express')
let prodroute = express.Router()
let product = require('../models/product');
let category = require('../models/category');
const auth = require("../middleware/auth");

// Get products based on category_id 
prodroute.get('/:category_id', auth, async function (req, res) {
    try {
        if (req.params.category_id == "all") {
            // returns all products 
            products = await product.find({})
        } else {
            products = await category.find({ "parent_id": { $eq: req.params.category_id } }, { _id: 1 })
            catids = [req.params.category_id]
            products.map((id) => catids.push("" + id._id))
            products = await product.find({ category: { $in: catids } })
        }
        logger.info(`Product/:category_id: Get products for category id: ${req.params.category_id}`);
        res.status(200).send(products)
    } catch (error) {
        logger.error(`Product/:category_id: Error while finding product: ${((error.stack) ? error.stack : error)}`)
        res.status(400).send(`Error while finding product: ${error}`);
    }
})

prodroute.post('/add', auth, async function (req, res) {
    try {
        // Only Supervisor can add products
        if (req.user.role == "Supervisor") {
            logger.info(`Product/add: Adding Product ${JSON.stringify(req.body)}`);
            newprod = new product(req.body)
            result = await newprod.save()
            res.status(200).send('Added product successfully')
        } else {
            logger.warn(`Product/add: You cant add product, role: ${req.user.role}`)
            res.status(400).send(`You cant add product, role: ${req.user.role}`)
        }
    } catch (error) {
        logger.error(`Product/add: Error while inserting product: ${((error.stack) ? error.stack : error)}`);
        res.status(401).send(`Error while inserting product: ${error}`);
    }
})

prodroute.post('/update', auth, async function (req, res) {
    // Only Supervisor can update products
    try {
        if (req.user.role == "Supervisor") {
            logger.info(`Product/update: Updating Product ${JSON.stringify(req.body)}`);
            newprod = new product(req.body.data);
            await product.updateOne({ _id: req.body._id }, req.body.data, { runValidators: true })
            res.status(200).send('Product details updated')
        } else {
            logger.warn(`Product/update: You cant update product, role: ${req.user.role}`)
            res.status(400).send(`You cant update product, role: ${req.user.role}`)
        }
    } catch (error) {
        logger.error(`Product/update: Error while updating product: ${((error.stack) ? error.stack : error)}`);
        res.status(400).send(`Error while updating prod: ${error}`)
    }
})

prodroute.delete('/:id', auth, async function (req, res) {
    // Only Supervisor can delete a product
    try {
        if (req.user.role == "Supervisor") {
            logger.info(`Product/delete: Deleting Product id: ${req.params.id}`);
            result = await product.deleteOne({ _id: req.params.id })
            res.status(200).send(`delete prod details: ${JSON.stringify(result)}`)
        } else {
            logger.warn(`Product/delete: You cant delete product, role: ${req.user.role}`)
            res.status(400).send(`You cant delete product, role: ${req.user.role}`)
        }
    } catch (error) {
        logger.error(`Product/delete: Error while deleting product: ${((error.stack) ? error.stack : error)}`);
        res.status(400).send(`Error while deleting: ${error}`)
    }
})

module.exports = prodroute