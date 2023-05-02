const { default: mongoose } = require("mongoose");
const commentModel = require("../../model/commentModel");
const postModel = require("../../model/postModel");
const tagModel = require('../../model/tagModel');
const readinglistModel = require("../../model/readinglistModel");


module.exports={

  // add new post

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
          // console.log(newpost);
          newpost.save().then(()=>{
            res.json("success").status(200)
          })
        } catch (error) {
          next(error)
        }
    },

    // get all tags 

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

    // show single post details

    singlepost:(req,res,next)=>{
      try {
        // console.log(req.params.id);
        postModel.findOne({_id:req.params.id}).populate('userId').populate('tag').then((data)=>{
          // console.log(data);
          res.json(data)
        })
      } catch (error) {
        console.log(error);
        next()
      }
    },

    // get comments

    comments:(req,res,next)=>{
      try {
        commentModel.findOne({postId:req.body.id}).sort({'comment.date':-1}).populate('comment.userId').then((data)=>{
          // console.log(data,'comments');
          // data.comment.filter((a)=>{return })
          res.json(data)
        })
      } catch (error) {
        next(error)
      }
    },

    // like and dislike

    addlike:(req,res,next)=>{
      try {
        console.log(req.body);
        console.log(req.body.value==true);
      if(req.body.value){
        postModel.updateOne({_id:req.body.id},{$addToSet:{likes:res.locals.jwtUSER._id}}).then((data)=>{
          res.json()
        })
      }else{
        console.log(typeof res.locals.jwtUSER._id);
        postModel.updateOne({_id:req.body.id},{$pull:{likes:res.locals.jwtUSER._id}}).then((data)=>{
          res.json()
        })
      }
      } catch (error) {
        next(error)
      }
    },
    addreadlist:async(req,res,next)=>{
      try {
        console.log(req.body.id);
        console.log(res.locals.jwtUSER._id);
        let post=await postModel.findOne({_id:req.body.id})
        let read=await readinglistModel.findOne({postId:req.body.id})
       if(!read){
        let readlist=new readinglistModel({
          userId:res.locals.jwtUSER._id,
          postId:req.body.id,
          authId:post.userId
        })
        readlist.save().then(()=>{
          res.json('success')
        })
       }else{
        res.json('alreadyadded')
       }
      } catch (error) {
        next(error)
      }
    },
    getreadlist:(req,res,next)=>{
      try {
        // readinglistModel.find({userId:res.locals.jwtUSER._id}).populate('postId').populate('postId.userId').then((data)=>{
        //   console.log(data);
        //   res.json(data)
        // })
        const user=new mongoose.Types.ObjectId(res.locals.jwtUSER._id)
        readinglistModel.aggregate([{$match:{userId:user}},{$lookup:{from:'postdatas',localField:'postId',foreignField:'_id',as:'post'}},{$lookup:{from:'userdatas',localField:'authId',foreignField:'_id',as:'auth'}}]).then((data)=>{
          console.log(data);
          res.json(data)
        })
      } catch (error) {
        next(error)
      }
    }

}
