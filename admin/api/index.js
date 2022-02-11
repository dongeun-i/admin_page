import express from 'express'

// Create express router
const router = express.Router()
const app = express();

// db 모듈 연결
var mysqlDB = require('./db');


// router 연결준비
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request);
  Object.setPrototypeOf(res, app.response);
  req.res = res;
  res.req = req;
  next();
});

app.get('/',(req,res,next)=>{
  res.send('root');
})

export default {
  path: '/api',
  handler: router
};

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//CORS 해결
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});