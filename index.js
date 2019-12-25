const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const product = require("./routes/product");
const category = require("./routes/category");
const user = require("./routes/user");
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
app.use('/category', category)
app.use('/product', product)
app.use('/user', user)

app.listen(process.env.PORT, () => logger.info(`Server: E-Product-management app listening on port ${3000}!`))