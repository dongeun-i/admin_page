const { Router } = require('express');
const { json } = require('express/lib/response');
const router = Router();
const multer = require('multer');


// storage setting for file
// storage default
const storage = multer.diskStorage({
  destination:  (req, file, cb) => {
    cb(null, 'static/img')
  },
  filename:  (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)// 파일 원본이름 저장
  }
})
const upload = multer({ storage: storage }); // 미들웨어 생성

router.post('/',(req, res, next) => {
  let fileName = req.body.fileName;
  console.log(fileName);
  if(fileName){
    storage = multer.diskStorage({
      destination:  (req, file, cb) => {
        cb(null, 'static/img')
      },
      filename:  (req, file, cb) => {
        cb(null, fileName);
      }
    })
  }
  upload.single('img')
	console.log('post 실행');
    res.status(201).send({
        message: "이미지 저장 성공",
        fileInfo: req.file
    })
})


module.exports = router