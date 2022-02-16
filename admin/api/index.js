const express = require('express');
// const { json } = require('express/lib/response');
const app = express();
// app.use(express)
// const db = require('./db');
const dirname = __dirname;
// const path = require('path');

// 미들웨어이기 때문에 port는 따로 지정하지 않아도 되는 것 같다.

// route를 직접 작성할 경우
app.get('/', function (req, res) {
  console.log('요청은 들엉뢌나',req);
  res.send('Hello World!');
});

// route 설정을 분리할 경우
// 물론 여럿 추가할 수 있음
// const user = require('./users/user');
// app.use('/user',user);
app.get(dirname+'/user', (req,res)=>{
  let resData ;
  db.query('select * from customer',(err,rows)=>{
    if(!err){
			console.log(rows);
			res.json(rows);
		}else{
			console.err('err!',err);
		}
  })
});
// app.next();

module.exports={
  path:'/api',
  handler:app
}

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//CORS 해결
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});