const { Router } = require('express');
const { json } = require('express/lib/response');
const router = Router();
const multer = require('multer');
const fs = require('fs');

// storage setting for file
const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
      cb(null, 'static/img')
    },
    filename:  (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname)// 파일 원본이름 저장
    }
  })
const upload = multer({ storage: storage }); // 미들웨어 생성

router.post('/',upload.single('img'),(req, res, next) => {
	console.log('post 실행');
    let file = req.file;
    let fileName = file.filename;
    let type = file.mimetype.replace(/image\//g,'.');
    let newFileName = req.body.fileName?req.body.fileName+type:'샘플이미지'+type;
    console.log(fileName);
    fs.rename(`static/img/${fileName}`,`static/img/${newFileName}`,(error)=>{
        if(error){
            console.log(error)
        }else{
            res.status(201).send({
                message: "이미지 저장 성공",
                fileInfo: req.file
            })
        }
        
    })
})
module.exports = router