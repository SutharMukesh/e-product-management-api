const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const products = require("./routes/products");
const categories = require("./routes/categories");
const user = require("./routes/users");
const logger = require('./logger');
require('dotenv').config()
global.logger = logger

// Set up mongodb connection
mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

// register middlewares
app.use(bodyParser.json())
app.use('/category', categories)
app.use('/product', products)
app.use('/user', user)

app.listen(process.env.PORT, () => logger.info(`Server: E-Product-management app listening on port ${3000}!`))