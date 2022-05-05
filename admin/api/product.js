const { Router } = require('express');
const { json } = require('express/lib/response');
const router = Router();

const multer = require('multer');
const fs = require('fs');
import query from './db'
// storage setting for file
// storage default
const storage = multer.diskStorage({
  destination:  (req, file, cb) => {
    console.log('multer req.body = ',req.body )
    cb(null,'static/img/product')
  },
  filename:  (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)// 파일 원본이름 저장
  }
})
const upload = multer({ storage:storage }).fields([{name:'thumbnail'},{name:'detail'}])

/**
 * @author dongeun
 * @param path {string} 파일 경로
 * @param old {string} 임시이름이 붙여진 파일
 * @param name {string} 새로운 이름의 파일이름
 * @description DB에 상품등록 이후 fs모듈을 통해서 임시이름으로 된 파일을 바꿔주는 함수 (static/img/product에 있는 이미지)
 * */ 
const change_filename = function(path,old,name){
	return new Promise((res,rej)=>{
		let old_file=`${path}/${old}`;
		let new_file=`${path}/${name}`;
		fs.rename(old_file,new_file,(err)=>{
			if(err){
				rej(err);
			}else{
				res('File rename fin.');
			}
		})
	})
}
router.get('/list',async function(req,res,next){
	let userId = req.header('userId');
	// 상품리스트 가져오기
	if(userId){
		let qs = `select P.* ,C.label from product as P left outer join category as C on C.id = P.categoryId where P.userId = ${userId} ORDER by P.regdate desc`
		let dataSet = await query(qs);
		res.send(dataSet);
	}
	
})
router.post('/register',async function(req,res,next){
	upload(req,res,function(err){
		if(err){
			console.log(err)
			res.send(err)
		}else{
			console.log(req.body);
			console.log(req.files['thumbnail']);
			let productInfo = req.body;
			let table_column = Object.keys(productInfo).join(",");
			let table_value = Object.values(productInfo).join("','");
			let qs = `INSERT INTO product (${table_column}) VALUES ('${table_value}')`
			let thumbnail = req.files['thumbnail'][0];
			let thumbnail_type = thumbnail.mimetype.replace(/image\//g,'.')
			query(qs).then(result=>{
				// 	// 들어갔으면 이후 로직
					let productId = result.insertId;
					let newFileName = `product_${productId}${thumbnail_type}`
					console.log('thumbnail=',thumbnail);
					fs.rename(`static/img/product/${thumbnail.filename}`,`static/img/product/${newFileName}`,async(err)=>{
						if(err){
							console.err(err);
						}else{
							let qs = `UPDATE product as P SET P.thumbnail='/img/product/${newFileName}' WHERE P.id=${productId}`
							let response = await query(qs);
							res.send(response);
						}
					})
			});
		}
		
	})

})

// 상품 상세
router.get('/:id',async function(req,res,next){
	console.log(req.params.id,'1');
	let productId = req.params.id;
	let qs = `select P.*, C.id as categoryId from product as P left outer join category as C on C.id = P.categoryId where P.id = ${productId}`
	let dataSet = await query(qs)
	res.send(dataSet);
})
// 상품 수정
router.put('/:id',async function(req,res,next){
	console.log(req.params.id,'2');
	let productId = req.params.id;
	let productInfo = req.body.productInfo;
	let qsBase = Object.entries(productInfo).map(arr=>{
		let column = `P.${arr[0]}`
		let value = arr[1];
		return arr = `${column} = '${value}'`
	})
	let qs = `UPDATE product AS P SET ${qsBase.join(',')} WHERE P.id=${productId}`
	let result = await query(qs)
	res.send(result);
})
//  상품 등록

router.delete('/delete/:id',async function(req,res,next){
	let productId = req.params.id;
	let qs = `delete from product as P where P.id =${productId}`;
	let result = await query(qs);
	res.send(result)
})

module.exports = router;