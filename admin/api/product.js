const { Router } = require('express');
const { json } = require('express/lib/response');
const router = Router();
import callData from './db'

// 상품리스트
router.get('/list',async function(req,res,next){
	let userId = req.body.userId;
	let qs = `select P.* from product as P where P.userId = ${userId}`
	let dataSet = await callData(qs);
	res.send(dataSet);
})

// 상품 상세
router.get('/:id',async function(req,res,next){
	console.log(req.params.id);
	let productId = req.params.id;
	let qs = `select P.* from product as P where P.id = ${productId}`
	let dataSet = await callData(qs)
	res.send(dataSet);
})


module.exports = router;