const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const products = require("./routes/products");
const categories = require("./routes/categories");

app.use(bodyParser.json())
app.use('/category', categories)
app.use('/product', products)

app.listen(3000, () => console.log(`Example app listening on port ${3000}!`))