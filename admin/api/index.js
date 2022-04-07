const express = require("express");
const app = express();
const db = require("./db");
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/user', function(req, res){
  db.query('SELECT * from customer', function(err, rows, fields) {
    if (!err){
      console.log('The solution is: ', rows);
      res.send(rows);
    }else{
      console.log('Error while performing Query.', err);
      res.send(err);
    }
  });
  
});
export default app
