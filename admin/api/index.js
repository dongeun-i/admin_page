const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const dir = __dirname;
const file = __filename;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
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



export default app
