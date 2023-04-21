const { default: mongoose } = require("mongoose")
const postModel = require("../../model/postModel")
const tagModel = require("../../model/tagModel")
const userModel = require("../../model/userModel")

module.exports={

    gettagdetails:(req,res,next)=>{
        try {
            tagModel.find().limit(3).then((data)=>{
                res.json(data).status(200)
            })
        } catch (error) {
            next(error)
        }
    },
    getuser:(req,res,next)=>{
        try {
            userModel.findOne({_id:res.locals.jwtUSER._id}).then((data)=>{
                console.log(data);
                res.json(data)
            })
        } catch (error) {
            next(error)
        }
    },
    getpostdetails:(req,res,next)=>{
        try {
            postModel.find().populate('userId').populate('tag').sort({date:-    1}).then((data)=>{
                console.log(data);
                res.json(data)
            })
        } catch (error) {
            next(error)
        }
    },
    getsingletag:(req,res,next)=>{
        try {
            console.log(req.params.id,"tagsss");
            let id= new mongoose.Types.ObjectId(req.params.id)
            console.log(id);
            tagModel.findOne({_id:id}).then((data)=>{
                res.json(data).status(200)
            }).catch((error)=>{
                console.log(error);
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

}