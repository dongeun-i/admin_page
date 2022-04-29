const { Router } = require('express');
const { json } = require('express/lib/response');
const router = Router();
import query from './db'
router.post('/',async function(req,res,next){
	var user = {
		'id': req.body.user.id,
		'password': req.body.user.password
	};
	let qu = `select U.loginId , U.nickname, U.name, U.id, U.regdate  from user as U where U.loginId = '${user.id}' and U.password = '${user.password}'`
	let dataSet = await query (qu);
	console.log('dataSet',dataSet);
	res.send(dataSet);
})
module.exports = router;