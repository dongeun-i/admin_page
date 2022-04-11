const { Router } = require('express');
const router = Router();
const db = require('./db');
router.get('/', function(req, res,next) {
	let query = 'select * from admin'
	let resData = {}  
	db.query(query,(err,rows)=>{
		if(!err){
			console.log(rows);
			resData.userInfo=rows;
			res.send(resData)
		}else{
			console.error(err);
			res.send(err);
			throw err
		}
	});
	console.log(resData);
	next();
	
});

module.exports = router;