const userModel = require("../../model/userModel");
const jwt=require('../../helpers/jwt')
const bcrypt=require('bcrypt');
const nodemailer = require("nodemailer");
const { mongoose } = require("mongoose");


let transporter = nodemailer.createTransport({
  host: process.env.host,
  port: 587,

  auth: {
    user: process.env.Email,
    pass: process.env.pass,
  },
});
let otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
console.log(otp);
module.exports={
    signup:async (req,res,next)=>{
        try {
            console.log(req.body);
            let apiRes={}
            req.body.password = await bcrypt.hash(req.body.password, 10);
            console.log(req.body.password);
            let email=await userModel.findOne({email:req.body.email})
            if(!email){
                console.log("hello");
                let newuser = userModel({
                    userName: req.body.username,
                    email: req.body.email,
                    phone:req.body.phonenumber,
                    password: req.body.password,
                  });
                  newuser.save().then((data)=>{
                    console.log(data);
                    let token = jwt.sign({
                        _id:data._id
                    })
                    console.log(token);
                    apiRes.token = token;
                    apiRes.success = "added successfully";
                    console.log("COMPLETED");
                    res.json(apiRes);
                      // send mail with defined transport object
        // var mailOptions = {
        //   from: process.env.Email,
        //   to: req.body.email,
        //   subject: "Otp for registration is: ",
        //   html:
        //     "<h3>OTP for account verification is </h3>" +
        //     "<h1 style='font-weight:bold;'>" +
        //     otp +
        //     "</h1>", // html body
        // };
        // transporter.sendMail(mailOptions, (error, info) => {
        //   if (error) {
        //     return console.log(error);
        //   }
        //   apiRes.success = "added successfully";
        //   apiRes.data=data;
        //   res.json(apiRes)
        // });
                  })
            }else{
                apiRes.failed = "This email already exist";
                res.json(apiRes);
            }
        } catch (error) {
            next(error)
        }
    },
    generateotp:async(req,res,next)=>{
      try {
        console.log("GENERATE");
        console.log(res.locals.jwtUSER._id);
        let apiRes={}
        // let newuser=mongoose.Types.ObjectId('res.locals.jwtUSER._id')
        // console.log(newuser);
        let user=await userModel.findOne({_id:res.locals.jwtUSER._id})
console.log(user);
console.log('heek');
        var mailOptions = {
          from: process.env.Email,
          to: user.email,
          subject: "Otp for registration is: ",
          html:
            "<h3>OTP for account verification is </h3>" +
            "<h1 style='font-weight:bold;'>" +
            otp +
            "</h1>", // html body
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          apiRes.success = "otp generated";
          console.log("REPLAY");
          res.json(apiRes)
        });
      } catch (error) {
        next(error)
      }
    },
    otp:(req,res,next)=>{
      try {
        let apiRes={}
        console.log(req.body);
        if(otp==req.body.data){
          console.log('success');
          userModel.updateOne({_id:res.locals.jwtUSER._id},{$set:{verifyemail:true}}).then((data)=>{
            console.log("JSHSH");
          let token = jwt.sign({
                _id:data._id
            })
            console.log(token);
            apiRes.token = token;
            apiRes.data=data
            apiRes.success = "added successfully";
            res.json(apiRes);
          })
        }else{
          apiRes.failed = "please enter correct otp";
          res.json(apiRes);
        }
      } catch (error) {
        next(error)
      }
    },


    login:async(req,res,next)=>{
        try {
        let apiRes={}    
        let user=await userModel.findOne({email:req.body.email})
        if(user){
          console.log(user.status);
          if(user.status==true){
            apiRes.failed="this account admin blocked"
            return res.json(apiRes)
          }
          const isPass = await bcrypt.compare(req.body.password,user.password);
          if(isPass){
            let token = jwt.sign({
              _id: user._id,
            })
            apiRes.token = token;
            console.log(token);
            apiRes.success = 'Login Successful!'
            apiRes.user=user;
            return res.json(apiRes)
          }else{
            apiRes.failed='password and email is not matching'
            res.json(apiRes)
          }
        }else{
          apiRes.failed=`There is no account registered with the email id ${req.body.email}`
          res.json(apiRes)
        }

        } catch (error) {
         next(error)   
        }
    },

  
   


}