const { default: mongoose } = require("mongoose")
const postModel = require("../../model/postModel")
const tagModel = require("../../model/tagModel")
const userModel = require("../../model/userModel")
const reportModel = require("../../model/reportModel")

module.exports={

    // get 3 tag details

    gettagdetails:(req,res,next)=>{
        try {
            tagModel.find().limit(3).then((data)=>{
                res.json(data).status(200)
            })
        } catch (error) {
            next(error)
        }
    },

    // get user details

    getuser:(req,res,next)=>{
        try {
            console.log('user+++++++++++++++++');
            userModel.findOne({_id:res.locals.jwtUSER._id}).then((data)=>{
                console.log(data);
                res.json(data)
            })
        } catch (error) {
            next(error)
        }
    },

    // get all postdetails

    getpostdetails:(req,res,next)=>{
        try {
            postModel.find().populate('userId').populate('tag').sort({date:-1}).then((data)=>{
                // console.log(data);
                res.json(data)
            })
        } catch (error) {
            next(error)
        }
    },

    // get single tag detalils

    getsingletag:(req,res,next)=>{
        try {
            // console.log(req.params.id,"tagsss");
            let id= new mongoose.Types.ObjectId(req.params.id)
            // console.log(id);
            tagModel.findOne({_id:id}).then((data)=>{
                res.json(data).status(200)
            }).catch((error)=>{
                console.log(error);
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    },

    // report post

    report:(req,res,next)=>{
        try {
            console.log(req.body);
            console.log(res.locals.jwtUSER._id);
            let report=new reportModel({
                postId:req.body.id,
                issue:req.body.formData.reportissue,
                reporterId:res.locals.jwtUSER._id
            })
            report.save().then(()=>{
                res.json('success')
            })
        } catch (error) {
            next(error)
        }
    }

}