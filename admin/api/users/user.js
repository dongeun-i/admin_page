const { Router } = require('express');
const router = Router();

const db = require('../db');
router.use(function(req, res, next) {
	console.log('%s %s %s', req.method, req.url, req.path);
	db.query('select * from admin',(err,rows)=>{
		if(!err){
			console.log(rows);
			return(rows)
		}else{
			console.error(err);
			throw err
		}
	})
	next();
  });

