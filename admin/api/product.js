const { Router } = require('express');
const { json } = require('express/lib/response');
const router = Router();
import callData from './db'

function getProductList(userId) {
	return new Promise(function(resolve, reject) {
		let qs = `select P.* from product as P where P.userId = ${userId}`
		let dataSet = callData(qs);
		resolve(dataSet)
	});
}

// 상품리스트
router.get('/list',async function(req,res,next){
	let userId = req.body.userId;
	// 상품 가져오기
	let resdata = {}
	Promise.all([getProductList,])
	{
		let qs = `select P.* from product as P where P.userId = ${userId}`
		let dataSet = await callData(qs);
		resdata.productListset = dataSet;
	}
	// 필터영역부
	{
		let qs = 'select C.* from category as C ';
		let CategotydataSet = await callData(qs);
		resdata.categoryListSet = CategotydataSet;
	}
	res.send(resdata);
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