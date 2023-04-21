const postModel = require("../../model/postModel");
const tagModel = require('../../model/tagModel')


module.exports={
    addpost:async(req,res,next)=>{
        try { 
          console.log(req.body,"files");
          let tagArray = req.body.tag.split(',');
          const filenames = req.files.map((file) => file.filename);
          console.log(filenames,"newfile");
            for (let i = 0; i < tagArray.length; i++) {
              let data= await tagModel.findOne({title:tagArray[i]})
              tagArray[i]=data?.id
            }
           
          console.log(tagArray,'array');
          let newpost=postModel({
            userId:res.locals.jwtUSER._id,
            post:req.body.editor,
            image:filenames[0],
            tag:tagArray
          })
          console.log(newpost);
          newpost.save().then(()=>{
            res.json("success").status(200)
          })
        } catch (error) {
          next(error)
        }
    },
    gettag:(req,res,next)=>{
      try {
        let tag=[]
        tagModel.aggregate([{$match:{}},{$project:{title:1,_id:0}}]).then((data)=>{
          data.forEach(element => {
            tag.push(element.title)
          });
          res.json(tag).status(200)
        })
      } catch (error) {
        next(error)
      }
    },
    singlepost:(req,res,next)=>{
      try {
        console.log(req.params.id);
        postModel.findOne({_id:req.params.id}).populate('userId').then((data)=>{
          console.log(data);
          res.json(data)
        })
      } catch (error) {
        console.log(error);
        next()
      }
    }
}
