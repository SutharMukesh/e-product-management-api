const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const products = require("./routes/products");
const categories = require("./routes/categories");
const user = require("./routes/users");
var mongoose = require('mongoose');
require('dotenv').config()

//Set up default mongoose connection
var mongoDB = process.env.MONGO;
mongoose.connect(mongoDB, { useNewUrlParser: true });

app.use(bodyParser.json())
app.use('/category', categories)
app.use('/product', products)
app.use('/user', user)

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${3000}!`))