const { Router } = require('express');
const router = Router();
import query from './db'
router.get('/', async function(req, res,next) {
	let query = 'select * from admin'
	let dataSet = await query (query);
	console.log(dataSet);
	next();
	
});

module.exports = router;