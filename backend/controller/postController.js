const postModel = require("../model/postModel");
const tagModel = require('../model/tagModel')


module.exports={
    addpost:(req,res,next)=>{
        try { 
          console.log("ADDPOST");
          console.log(req.body);
          let newpost=postModel({
            userId:res.locals.jwtUSER._id,
            post:req.body.editor,
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
    }
}
