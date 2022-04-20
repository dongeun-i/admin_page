const { Router } = require('express');
const { json } = require('express/lib/response');
const router = Router();
import callData from './db'

router.get('/list',async function(req,res,next){
	let userId = req.header('userId');
	// 상품리스트 가져오기
	if(userId){
		let qs = `select P.* ,C.label from product as P left outer join category as C on C.id = P.categoryId where P.userId = ${userId}`
		let dataSet = await callData(qs);
		res.send(dataSet);
	}
	
})

// 상품 상세
router.get('/:id',async function(req,res,next){
	console.log(req.params.id);
	let productId = req.params.id;
	let qs = `select P.*, C.id from product as P left outer join category as C on C.id = P.categoryId where P.id = ${productId}`
	let dataSet = await callData(qs)
	res.send(dataSet);
})


module.exports = router;