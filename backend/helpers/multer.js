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
    if(isValid){
      uploadError = null
    }
    cb(uploadError, './public/productimages')
  },
  filename: function (req, file, cb) {
    const filename = file.originalname.split(' ').join('-')
    const extension = FILE_TYPE_MAP[file.mimetype]
    cb(null, `${filename.split('.')[0]}-${Date.now()}.${extension}`)
    console.log("HELLO");
  }
})
const uploadOptions = multer({ storage:storage})
module.exports={uploadOptions}
