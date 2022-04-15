// 데이터베이스 연결 
const mysql = require("mysql2/promise");
const pool = mysql.createPool({
	host: '127.0.0.1',
  port: 3306,
  user: 'root',   
  password: '!dlehddms1014',
  database: 'admin'  
});

const callData = async (qu) => {
  try {
		const connection = await pool.getConnection(async conn => conn);
		try {
			const [rows] = await connection.query(qu);
			connection.release();
			return rows;
		} catch(err) {
			console.log('Query Error');
			connection.release();
			return false;
		}
	} catch(err) {
		console.log('DB Error');
		return false;
	}
};
module.exports = callData;