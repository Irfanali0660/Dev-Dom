const { default: mongoose } = require("mongoose");
const postModel = require("../../model/postModel");
const tagModel = require("../../model/tagModel");

module.exports={

    // get tag related post

    gettagpost:(req,res,next)=>{
        try {
            console.log(req.query.id,'++++++++++++++++++=');
            const id=new mongoose.Types.ObjectId(req.query.id)
            postModel.aggregate([{ $match: { tag: { $in: [id] } } },{$lookup:{from:'userdatas',localField:'userId',foreignField:'_id',as:'userId'}}]).then((data)=>{
                console.log(data,'tagpost');
                res.json(data)
            }).catch((error)=>{
                console.log(error);
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    },

    // get all tags

    gettags:(req,res,next)=>{
        try {
            tagModel.find().then((tag)=>{
                res.json(tag)
            })
        } catch (error) {
            next(error)
        }
    }
}