const { Router } = require('express');
const { json } = require('express/lib/response');
const router = Router();
import query from './db'
router.post('/',async function(req,res,next){
	let payload = req.body.userdata;
	let loginId = payload.loginId;
	let qs = `select U.loginId from user as U where U.loginId='${loginId}'`
	query(qs).then(async data=>{
		if(data.length>0){
			console.log(data);
			res.status(409).send('loginId is duplicated');
		}else{
			let table_column = Object.keys(payload).join(",");
			let table_value = Object.values(payload).join("','");
			let updateQs = `INSERT INTO user (${table_column}) VALUES ('${table_value}')`
			let userData =await query(updateQs);
			res.send(userData)			
		}
	})
})
module.exports = router;