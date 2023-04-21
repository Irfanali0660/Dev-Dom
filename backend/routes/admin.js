var express = require('express');
var router = express.Router();
// const multer= require('../helpers/multer')
const multer=require('multer')
const { users,
        status,
        addtag,
        gettags,
        deletetag,
        tagdetails,
        adminlogin,
        edittag }=require('../controller/admin/adminController')

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
      



router.post('/adminlogin',adminlogin);
router.post('/addtag',uploadOptions.array('image'),addtag)
router.post('/edittag',uploadOptions.array('image'),edittag)


router.get('/users',users)
router.get('/gettags',gettags)
router.get('/tagdetails/:id',tagdetails)

router.put('/status/:id',status)

router.delete('/deletetag/:id',deletetag)





module.exports = router;
