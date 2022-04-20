const { Router } = require('express');
const router = Router();
import callData from './db'
router.get('/', async function(req, res,next) {
	let query = 'select * from admin'
	let dataSet = await callData (query);
	console.log(dataSet);
	next();
	
});

module.exports = router;