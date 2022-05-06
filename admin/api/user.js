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

module.exports = router;