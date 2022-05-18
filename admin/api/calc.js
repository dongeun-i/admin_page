const { Router } = require('express');
const router = Router();

import query from './db'

router.get('/',async function(req,res,next){
	let bdt = req.header('bdt');
	let edt = req.header('edt');
	let qs = `select ${[
		'P.price',
		'P.deliveryCost',
		'P.discount',
		'OS.label'
	].join(',')} from admin.order as O left outer join product as P on O.productId = P.id left outer join orderStatus as OS on OS.id = O.status where O.orderDate >= '${bdt}' and O.orderDate <= '${edt}'`
	let dataSet = await query(qs);
	res.send(dataSet);
})

module.exports = router;