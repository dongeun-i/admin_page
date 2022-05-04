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
    cb(null,req.body.path)
  },
  filename:  (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)// 파일 원본이름 저장
  }
})
const singleUpload = multer({ storage: storage }).single('img'); // 미들웨어 생성

router.post('/product',(req, res, next) => {
	singleUpload(req,res,err=>{
		if(err){
			console.log(err)
			return
		}else{
			let file = req.file;
			let type = file.mimetype.replace(/image\//g,'.');

			let path = req.body.path
			let newFileName = req.body.newFileName?req.body.newFileName+type:null;
			if(newFileName){
				console.log('파일이름바꾸기',`${path}/${file.filename}`,)
				fs.rename(`${path}/${file.filename}`,`${path}/${newFileName}`,(error)=>{
					if(error){
						console.log(error);
					}	
				})
			}
			res.status(201).send({
				message: "이미지 저장 성공",
				fileInfo: req.file
			})
		}
	})
			
	
})
router.delete('/',(req,res)=>{
	let filePath  = req.body.filename;
	console.log(filePath)
	fs.unlink(`static${filePath}`,(err)=>{
		if(err){
			console.error(err)
			res.send(err);
		}else{
			res.send('삭제완료');
		}
	})
})




module.exports = router