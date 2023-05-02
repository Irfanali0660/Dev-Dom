const mongoose = require('mongoose');
const moment=require('moment')
const commentSchema =new mongoose.Schema({
  
 
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "postData",
    },
    comment:[{
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref: "userData",
        },
        message:{type:String},
        date:{
            type:Date,
        },
    }],
   

})

module.exports = commentModel = mongoose.model('commentdata',commentSchema);