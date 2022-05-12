const { Router } = require('express');
const router = Router();

import query from './db'

router.get('/list', async function(req, res,next) {
	let qs = 'select * from user'
	let dataSet = await query (qs);
	res.send(dataSet)	
});

router.get('/:id', async function(req, res,next) {
	let userId = req.params.id;
	let qs = `select * from user as U where U.id = ${userId}`
	let dataSet = await query (qs);
	res.send(dataSet)	
});

router.put('/:id', async function(req,res,next){
	let userId = req.params.id;
	let userInfo = req.body.userInfo;
	let qsBase = Object.entries(userInfo).map(arr=>{
		let column = `U.${arr[0]}`
		let value = arr[1];
		return arr = `${column} = '${value}'`
	})
	let qs = `UPDATE user as U SET ${qsBase.join(',')} WHERE U.id = ${userId}`
	let result = await query(qs);
	res.send(result);
})
module.exports = router;