const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const dir = __dirname;
const file = __filename;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination:  (req, file, cb) => {
    cb(null,req.body.path)
  },
  filename:  (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)// 파일 원본이름 저장
  }
})
const singleUpload = multer({ storage: storage }).single('img'); // 미들웨어 생성

const user = require('./user');
app.use('/api/user',user);

const login = require('./login');
app.use('/api/login',login);

const product = require('./product');
app.use('/api/product',product);

const category = require('./category');
app.use('/api/category',category);

// const multer = require('./upload');
// app.use('/api/upload',multer);

export default app
