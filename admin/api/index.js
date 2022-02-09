import express from 'express'

// Create express router
const router = express.Router()

const app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request);
  Object.setPrototypeOf(res, app.response);
  req.res = res;
  res.req = req;
  next();
});

// router.post('/login', (req, res) => {
//   if (req.body.id === 'admin' && req.body.pw === 'a00000') {
//     req.session.authUser = req.body.id
//     return res.json({ id: 'admin' });
//   }
//   return res.json({ id: '' });
// });

// router.post('/logout', (req, res) => {
//   delete req.session.authUser;
//   res.json({ ok: true });
// });

// Export the server middleware
export default {
  path: '/apis',
  handler: router
};


// 데이터베이스 연결 

var mysql = require('mysql');
// Connection 객체 생성 
var connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',   
  password: '!dlehddms1014',
  database: 'admin'  
});  
// Connect
connection.connect(function (err) {   
  if (err) {     
    console.error('mysql connection error');     
    console.error(err);     
    throw err;   
  }else{
    console.log('DB connection fin..')
  }
});
app.use(express.json());
app.use(express.urlencoded({ extended: true}));