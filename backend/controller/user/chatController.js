const chatModel = require("../../model/chatModel")
const userModel = require("../../model/userModel")

module.exports={
    getusers:(req,res,next)=>{
        try {
            userModel.find({_id:{$not:{$eq:res.locals.jwtUSER._id}}}).then((user)=>{
                res.json(user)
            })
        } catch (error) {
            next(error)
        }
    },
    chatroom:async(req,res,next)=>{
        try {
            console.log(req.params.id);
           let chatroom = await chatModel.findOne({users:{ $all: [ req.params.id,res.locals.jwtUSER._id ]}})
           console.log(chatroom);
           if(!chatroom){
            let newRoom=chatModel({
                users:[
                    req.params.id,
                    res.locals.jwtUSER._id
                ]
            })
            console.log(newRoom);
            newRoom.save().then((room)=>{
                res.json(room._id)
            })
           }else{
            res.json(chatroom._id)
           }
        } catch (error) {
            next(error)
        }
    },
    chatmessage:(req,res,next)=>{
        try {
            chatModel.findOne({_id:req.params.id}).populate('messages.sender').then((message)=>{
                res.json(message)
            })
        } catch (error) {
            next(error)
        }
    }
}