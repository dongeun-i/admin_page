const { Router } = require('express');
const router = Router();

import query from './db'


// 주문 상태별 갯수
router.get('/count', async function(req,res,next){
	let userId = req.header('userId');
	let orderStatusCount = await query(`
	select 
	count(case when O.status = 10 then 1 end) as '결재대기',
	count(case when O.status = 1 then 1 end) as '배송준비중',
	count(case when O.status = 2 then 1 end) as '배송중',
	count(case when O.status = 3 then 1 end) as '배송완료' 
	from admin.order as O where O.salerId=${userId}
	`)

	let claimStatusCount = await query(`
	select 
	count(case when O.status = 7 then 1 end) as '교환요청',
	count(case when O.status = 8 then 1 end) as '교환진행중',
	count(case when O.status = 4 then 1 end) as '반품요청',
	count(case when O.status = 5 then 1 end) as '반품진행중'
	from admin.order as O where O.salerId=${userId}
	`)
	res.send({
		orderStatusCount:orderStatusCount,
		claimStatusCount:claimStatusCount
	})
})
// 주문리스트
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

// 주문상태
router.get('/status', async function(req,res,next){
	let qs = 'select * from orderStatus';
	let orderStatus = await query(qs);
	res.send(orderStatus);
})

// 주문상세
router.get('/:orderCode', async function(req, res,next) {
	let orderCode = req.params.orderCode;
	console.log('orderCode',orderCode);
	let qs =`select ${[
		'O.orderCode',
		'O.orderDate as orderdate',
		'O.recipientName',
		'O.recipientTel',
		'O.deliveryMemo',
		'O.recipientJuso',
		'O.recipientDetailJuso',
		'O.salerId',
		'OS.id as status',
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

// 주문 상태 수정
router.put('/:orderCode',async function(req,res,next){
	let orderCode = req.params.orderCode;
	let orderInfo = req.body.orderInfo;
	let qsBase = Object.entries(orderInfo).map(arr=>{
		let column = `O.${arr[0]}`
		let value = arr[1];
		return arr = `${column} = '${value}'`
	})
	let qs = `UPDATE admin.order as O SET ${qsBase.join(',')} WHERE O.orderCode = ${orderCode}`
	let result = await query(qs);
	res.send(qs);
});



module.exports = router;