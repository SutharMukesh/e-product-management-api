const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const products = require("./routes/products");
const categories = require("./routes/categories");
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/eprodmanagement';
mongoose.connect(mongoDB, { useNewUrlParser: true });

app.use(bodyParser.json())
app.use('/category', categories)
app.use('/product', products)

app.listen(3000, () => console.log(`Example app listening on port ${3000}!`))