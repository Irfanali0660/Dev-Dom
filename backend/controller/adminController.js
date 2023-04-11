const tagModel = require("../model/tagModel");
const userModel = require("../model/userModel")



module.exports={


    users:(req,res,next)=>{
        try {
            console.log("HELLOOO");
            userModel.find().then((data)=>{
                console.log(data);
                res.json(data)
            })
        } catch (error) {
            next(error)
        }
    },
    status:async(req,res,next)=>{
        try {
            console.log("STSTUSS");
            if(req.params.id){
                let usercheck=await userModel.findOne({_id:req.params.id})
                  if(usercheck){
                      if(usercheck.status==true){
                          userModel.updateOne({_id:req.params.id},{$set:{status:false}}).then(()=>{
                              res.json()
                          })
                      }else{
                          userModel.updateOne({_id:req.params.id},{$set:{status:true}}).then(()=>{
                              res.json()
                          })
                      }
                  }
              }
        } catch (error) {
            next(error)
        }
    },
    addtag:(req,res,next)=>{
        try {
            console.log(req.body);
            const filenames = req.files.map((file) => file.filename);
            console.log(filenames);
            let tag=tagModel({
                title:req.body.title,
                description:req.body.description,
                image:filenames[0]
            })
            tag.save().then(()=>{
                res.json({success:"tag data added successfully"}).status(200)
            }).catch((error)=>{
                res.json({error:error})
            })
        } catch (error) {
            next(error)
        }
    },
    gettags:(req,res,next)=>{
        try {
            tagModel.find().then((data)=>{
               console.log(data);
               res.json(data)
            })
        } catch (error) {
            next(error)
        }
    },
    deletetag:(req,res,next)=>{
        try {
            tagModel.deleteOne({_id:req.params.id}).then(()=>{
                res.json().status(200)
            }).catch(()=>{
                res.json({failed:"ERROR"})
            })
        } catch (error) {
            next(error)
        }
    },
    tagdetails:(req,res,next)=>{
        try {
            console.log("tagdetails");
            console.log(req.params.id);
            tagModel.findOne({_id:req.params.id}).then((data)=>{
                res.json({data}).status(200)
            })
        } catch (error) {
            next(error)
        }
    }

}