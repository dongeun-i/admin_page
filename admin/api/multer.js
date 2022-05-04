const multer = require('multer');
const fs = require('fs');

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
const singleUpload = multer({ storage: storage }).single('img'); // 싱글업로드 생성
const arrayUpload = multer({storage}).array('imgs'); //다중 업로드



module.exports = [singleUpload,arrayUpload]