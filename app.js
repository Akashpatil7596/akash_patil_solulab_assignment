const express = require('express');
const bodyParser = require('body-parser');
const dbConn = require('./config/database');
const productRoute = require('./routes/product.route');
const categoryRoute = require('./routes/category.route')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/product', productRoute);
app.use('/category', categoryRoute);

module.exports = app;