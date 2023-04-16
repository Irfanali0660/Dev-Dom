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
            let apiRes={}
            postModel.find().then((data)=>{
                
                res.json(data).status(200)
            })
        } catch (error) {
            next(error)
        }
    }
}