const { Router } = require('express');
const { json } = require('express/lib/response');
const router = Router();
const db = require('./db');
router.post('/',function(req,res,next){
	var user = {
		'id': req.body.user.id,
		'password': req.body.user.password
	};
	console.log(user);
	let qu = `select `
	next();
})
module.exports = router;