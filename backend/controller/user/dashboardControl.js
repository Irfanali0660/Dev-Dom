const listModel = require("../../model/listModel");
const postModel = require("../../model/postModel");
const userModel = require("../../model/userModel");

module.exports={
    updatebio:(req,res,next)=>{
        try {
            console.log(req.body);
            userModel.updateOne({_id:res.locals.jwtUSER._id},{$set:{
                userName:req.body.form.userName,
                phone:req.body.form.phone,
                work:req.body.form.work,
                location:req.body.form.location,
                birthday:req.body.form.birthday,
                gender:req.body.form.gender,
                address:req.body.form.address,
            }}).then(()=>{
               res.json({success:"updated suucesfully"})
            }).catch((error)=>{
                next(error)
            })
        } catch (error) {
            next(error)
        }
    },
    userlist:(req,res,next)=>{
        try {
            listModel.find({userId:res.locals.jwtUSER._id}).populate('userId').then((list)=>{
                console.log(list);
                res.json(list)
            })
        } catch (error) {
            next(error)
        }
    },
    deletelist:(req,res,next)=>{
        try {
            listModel.deleteOne({_id:req.params.id}).then(()=>{
                res.json({success:"list deleted successfully"})
            })
        } catch (error) {
            next(error)
        }
    },
    editlist:(req,res,next)=>{
        try {
            console.log(req.params.id,"iddddd");
            listModel.findOne({_id:req.params.id}).populate('category').then((list)=>{
                res.json(list)
            })
        } catch (error) {
            next(error)
        }
    },
    updateList:(req,res,params)=>{
        try {
            console.log(req.body);
            listModel.updateOne({_id:req.body._id},{$set:{
                title:req.body.title,
                details:req.body.details,
                category:req.body.category,
                expdate:req.body.expdate,
                tag:req.body.tag,
                location:req.body.location,
                date:Date.now()
            }}).then(()=>{
                res.json({success:"success"})
            })
        } catch (error) {
            next(error)
        }
    },

    getuserpost:(req,res,next)=>{
       try {
        postModel.find({userId:res.locals.jwtUSER._id}).populate('userId').populate('tag').sort({date:-1}).then((post)=>{
            res.json(post)
        })
       } catch (error) {
        next(error)
       }
    },
    deletepost:(req,res,next)=>{
        try {
            postModel.deleteOne({_id:req.params.id}).then(()=>{
                res.json()
            })
        } catch (error) {
            next(error)
        }
    }
}