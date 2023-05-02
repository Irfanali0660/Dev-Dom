var express = require('express');
var router = express.Router();
const { signup,login,otp,generateotp,sociallogin,socialsignup,forgotpass,resetpassword } = require('../controller/auth/auth');
const { addpost,gettag,singlepost,comments,addlike,addreadlist,getreadlist }= require('../controller/user/postController')
const { gettagdetails,getuser,getpostdetails,getsingletag,report }=require('../controller/user/homeContorll')
const {getlistcate,addnewlist,getlist}=require('../controller/user/listController')
const { gettagpost,gettags }=require('../controller/user/tagcontroller')
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
router.get('/sociallogin/:id',sociallogin)
router.post('/addpost',uploadOptions.array('image'),jwt.verify,addpost)
router.post('/forgotpass',forgotpass)
router.post('/comments',comments)
router.post('/addnewlist',jwt.verify,addnewlist)
router.post('/report',jwt.verify,report)
router.post('/addreadlist',jwt.verify,addreadlist)

router.get('/socialsignup/:id',socialsignup)
router.get('/getsingletag/:id',getsingletag)
router.post('/resetpassword',resetpassword)

router.put('/otp',jwt.verify,otp)
router.put('/addlike',jwt.verify,addlike)

router.get('/gettag',gettag)
router.get('/gettagdetails',gettagdetails)
router.get('/generateotp',jwt.verify,generateotp)
router.get('/getuser',jwt.verify,getuser)
router.get('/getpostdetails',getpostdetails)
router.get('/singlepost/:id',singlepost)
router.get('/getlistcate',getlistcate)
router.get('/getlist',getlist)
router.get('/gettagpost',gettagpost)
router.get('/gettags',gettags)
router.get('/getreadlist',jwt.verify,getreadlist)

module.exports = router;
