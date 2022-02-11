// 데이터베이스 연결 

var mysql  = require('mysql');
// Connection 객체 생성 
var connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',   
  password: '!dlehddms1014',
  database: 'admin'  
});  
// Connect

// connection.connect();

module.exports = connection;