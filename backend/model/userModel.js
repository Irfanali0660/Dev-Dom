const mongoose = require('mongoose');

const userSchema =new mongoose.Schema({
  
    userName: {
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:null
    },
    phone:{
        type:Number,
        required:true
    },
    status:{
        type:Boolean,
        default:false
    },
    location:{
        type:String,
        default:null
    },
    joinedDate:{
        type:Date,
        default:Date.now(),
        index:true  
    }

})

module.exports = userModel = mongoose.model('userData',userSchema);