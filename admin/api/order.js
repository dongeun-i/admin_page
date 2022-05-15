const { Router } = require('express');
const router = Router();

import query from './db'

router.get('/list', async function(req, res,next) {
	let userId = req.header('userId');
	let qs =`select ${[
		'O.orderCode',
		'O.orderDate as orderdate',
		'O.recipientName',
		'O.recipientTel',
		'O.deliveryMemo',
		'O.recipientJuso',
		'O.recipientDetailJuso',
		'O.salerId',
		'OS.label as status',
		'P.name as productName',
		'P.price',
		'P.discount',
		'P.thumbnail',
		'P.deliveryCost'
	].join(",")} from ${[
		'admin.order as O',
		'left outer join product as P on P.id = O.productId',
		'left outer join orderStatus as OS on OS.id = O.status',
		'left outer join payType as PT on PT.id = O.payType'
	].join(" ")} where O.salerId = ${userId} GROUP BY O.orderCode order by O.orderCode desc`
	let dataSet = await query (qs);
	res.send(dataSet)	
});

router.get('/status', async function(req,res,next){
	let qs = 'select * from orderStatus';
	let orderStatus = await query(qs);
	res.send(orderStatus);
})
router.get('/:ordercode', async function(req, res,next) {
	let orderCode = req.params.ordercode;
	let qs =`select ${[
		'O.orderCode',
		'O.orderDate as orderdate',
		'O.recipientName',
		'O.recipientTel',
		'O.deliveryMemo',
		'O.recipientJuso',
		'O.recipientDetailJuso',
		'O.salerId',
		'OS.label as status',
		'P.name as productName',
		'P.price',
		'P.discount',
		'P.thumbnail',
		'P.deliveryCost',
		'O.counter',
		'O.ordererName',
		'O.ordererTel',
		'O.ordererEmail'
	].join(",")} from ${[
		'admin.order as O',
		'left outer join product as P on P.id = O.productId',
		'left outer join orderStatus as OS on OS.id = O.status',
		'left outer join payType as PT on PT.id = O.payType'
	].join(" ")} where O.orderCode = ${orderCode}`
	let dataSet = await query (qs);
	res.send(dataSet);	
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