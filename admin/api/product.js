const { Router } = require('express');
const { json } = require('express/lib/response');
const router = Router();

import { DATE } from 'mysql/lib/protocol/constants/types';
import Query from 'mysql/lib/protocol/sequences/Query';
import query from './db'

router.get('/list',async function(req,res,next){
	let userId = req.header('userId');
	// 상품리스트 가져오기
	if(userId){
		let qs = `select P.* ,C.label from product as P left outer join category as C on C.id = P.categoryId where P.userId = ${userId}`
		let dataSet = await query(qs);
		res.send(dataSet);
	}
	
})

// 상품 상세
router.get('/:id',async function(req,res,next){
	console.log(req.params.id);
	let productId = req.params.id;
	let qs = `select P.*, C.id from product as P left outer join category as C on C.id = P.categoryId where P.id = ${productId}`
	let dataSet = await query(qs)
	res.send(dataSet);
})
//  상품 등록
router.post('/register',function(req,res,next){
	console.log(req.body.productInfo);
	let productInfo = req.body.productInfo;
	let table_column = Object.keys(productInfo).join(',');
	let table_value = Object.values(productInfo).join("','");
	let qs = `INSERT INTO product (${table_column}) VALUES ('${table_value}')` 
	query(qs).then(result=>{
		// 들어갔으면 이후 로직 
		let insertId = result.insertId;
		let newFileName = `/img/product_${insertId}`
		let qs = `UPDATE product as P SET P.thumbnail='${newFileName}' WHERE P.id=${insertId}`
		query(qs);
		res.send(result);
	});
})


module.exports = router;