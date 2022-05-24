const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const user = require('./user');
app.use('/api/user',user);

const login = require('./login');
app.use('/api/login',login);

const product = require('./product');
app.use('/api/product',product);

const category = require('./category');
app.use('/api/category',category);

const order = require('./order');
app.use('/api/order',order);

const calc = require('./calc');
app.use('/api/calc',calc);

const signup = require('./signup');
app.use('/api/signUp',signup);

export default app
