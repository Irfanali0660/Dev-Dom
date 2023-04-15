var express = require('express');
var router = express.Router();
const { signup,login } = require('../controller/auth');
const { addpost,gettag }= require('../controller/postController')
const jwt = require('../helpers/jwt');
const multer=require('multer')


const FILE_TYPE_MAP = {
    'image/png':'png',
    'image/jpeg':'jpeg',
    'image/jpg':'jpg'
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype]
    let uploadError = new Error('invalid image type')
    console.log("HELLO");
    if(isValid){
      uploadError = null
    }
    cb(uploadError, './public/images')
  },
  filename: function (req, file, cb) {
    const filename = file.originalname.split(' ').join('-')
    const extension = FILE_TYPE_MAP[file.mimetype]
    cb(null, `${filename.split('.')[0]}-${Date.now()}.${extension}`)
    console.log("HELLO");
  }
})
const uploadOptions = multer({ storage:storage})

/* GET users listing. */
router.post('/signup',signup);
router.post('/login',login)
router.post('/addpost',uploadOptions.single('image'),jwt.verify,addpost)

router.get('/gettag',gettag)
module.exports = router;
