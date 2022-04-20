const { Router } = require('express');
const { json } = require('express/lib/response');
const router = Router();
import callData from './db'

router.get('/list',async function(req,res,next){
	// 카테고리 리스트 정보 가져오기
	let qs = 'select C.* from category as C ';
	let CategotydataSet = await callData(qs);
	res.send(CategotydataSet);
})

module.exports = router;