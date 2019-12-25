let express = require('express')
let catroute = express.Router()
const category = require('../models/category');
const auth = require("../middleware/auth");

catroute.get('/all', auth, async function (req, res) {
    try {
        logger.info(`Category/all: Getting all categories`);
        res.status(200).send(await category.find());
    } catch (error) {
        logger.error(`Category/all: Error while getting category: ${((error.stack) ? error.stack : error)}`);
        res.status(400).send(`Error while getting category: ${error}`);
    }
})

catroute.post('/add', auth, async function (req, res) {
    try {
        // Admin can add root as well as subcategory
        // only root categories are added by admin
        if (req.body.parent_id[0] == "root") {
            if (req.user.role == "Admin") {
                cat = new category(req.body);
                await cat.save();
                logger.info(`Category/add: Root Category added for ${JSON.stringify(req.body)}`);
                res.status(200).send('Root Category Added')
            } else {
                logger.warn(`Category/add: You are not allowed to create root categories: role: ${req.user.role}`);
                res.status(400).send(`You are not allowed to create root categories: role: ${req.user.role}`)
            }
        } else {
            // sub categories
            cat = new category(req.body);
            await cat.save();
            logger.info(`Category/add: Sub Category added for ${JSON.stringify(req.body)}`);
            res.status(200).send(`Subcategory Added by role: ${req.user.role}`);
        }
    } catch (error) {
        logger.error(`Category/add: Error while adding category: ${((error.stack) ? error.stack : error)}`)
        res.status(400).send(`Error while adding category: ${error}`);
    }
})

module.exports = catroute