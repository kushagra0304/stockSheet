// ---------------------------------------------------------
// NPM Packages

const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const path = require('path');
require('express-async-errors');

// ---------------------------------------------------------
// My imports 

const config = require('./utils/config');
const dispatchRouter = require('./controllers/dispatch')
const stockRouter = require('./controllers/stock');
const orderRouter = require('./controllers/order');
const companyRouter = require('./controllers/company')
const middlewares = require('./utils/middlewares');

// ---------------------------------------------------------
// Initialization

const app = express();

// ---------------------------------------------------------
// DB connection

app.use(middlewares.handleDataBaseConnection);

const url = process.env.MONGODB_URI;

console.log('Connecting to MongoDB');

mongoose.connect(url).then(() => {
  console.log('Connection successfull');
}).catch((e) => {
  console.log('Error connecting to MongoDB:', e.message);
});

// ---------------------------------------------------------
// Middleware list

if (config.NODE_ENV !== 'development') {
  app.use(express.static(path.join(__dirname + '/build')));
}
app.use(express.json());
if (config.NODE_ENV === 'development') {
    app.use(require('./utils/middlewares').morganRequestLogger);
    app.use(cors());
}
// ----------------------------
// Controllers
app.use('/api/dispatch', dispatchRouter);
app.use('/api/stock', stockRouter);
app.use('/api/order', orderRouter);
app.use('/api/company', companyRouter);
// ----------------------------
app.use(middlewares.unknownEndpoint);
app.use(middlewares.errorHandler); // this has to be the last loaded middleware.

// ---------------------------------------------------------
// Export express app

module.exports = app;

// ---------------------------------------------------------
