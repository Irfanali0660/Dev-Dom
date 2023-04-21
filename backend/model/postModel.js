const mongoose = require('mongoose');
const moment=require('moment')
const postSchema =new mongoose.Schema({
  
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "userData",
    },
    post:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:null
    },
    date:{
        type:String,
        default: moment(Date.now()).format("DD-MM-YYYY")
    },
    tag:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "tagData",
    }],
    likes:[mongoose.Schema.Types.ObjectId]

})

module.exports = postModel = mongoose.model('postdata',postSchema);