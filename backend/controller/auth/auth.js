const userModel = require("../../model/userModel");
const jwt = require("../../helpers/jwt");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { mongoose } = require("mongoose");
const { OAuth2Client } = require("google-auth-library");

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
module.exports = {

  //user signup

  signup: async (req, res, next) => {
    try {
      console.log(req.body);
      let apiRes = {};
      req.body.password = await bcrypt.hash(req.body.password, 10);
      console.log(req.body.password);
      let email = await userModel.findOne({ email: req.body.email });
      if (!email) {
        console.log("hello");
        let newuser = userModel({
          userName: req.body.username,
          email: req.body.email,
          phone: req.body.phonenumber,
          password: req.body.password,
        });
        newuser.save().then((data) => {
          console.log(data);
          let token = jwt.sign({
            _id: data._id,
          });
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
        });
      } else {
        apiRes.failed = "This email already exist";
        res.json(apiRes);
      }
    } catch (error) {
      next(error);
    }
  },

  // generate otp and send to user

  generateotp: async (req, res, next) => {
    try {
      console.log("GENERATE");
      console.log(otp);
      console.log(res.locals.jwtUSER._id);
      let apiRes = {};
      // let newuser=mongoose.Types.ObjectId('res.locals.jwtUSER._id')
      // console.log(newuser);
      let user = await userModel.findOne({ _id: res.locals.jwtUSER._id });
      console.log(user);
      console.log("heek");
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
        res.json(apiRes);
      });
    } catch (error) {
      next(error);
    }
  },

  // otp verification

  otp: (req, res, next) => {
    try {
      let apiRes = {};
      console.log(req.body);
      if (otp == req.body.data) {
        console.log("success");
        userModel
          .updateOne(
            { _id: res.locals.jwtUSER._id },
            { $set: { verifyemail: true } }
          )
          .then((data) => {
            console.log("JSHSH");
            let token = jwt.sign({
              _id: data._id,
            });
            console.log(token);
            apiRes.token = token;
            apiRes.data = data;
            apiRes.success = "added successfully";
            res.json(apiRes);
          });
      } else {
        apiRes.failed = "please enter correct otp";
        res.json(apiRes);
      }
    } catch (error) {
      next(error);
    }
  },

  //user login check

  login: async (req, res, next) => {
    try {
      let apiRes = {};
      let user = await userModel.findOne({ email: req.body.email });
      if (user) {
        console.log(user.status);
        if (user.status == true) {
          apiRes.failed = "this account admin blocked";
          return res.json(apiRes);
        }
        const isPass = await bcrypt.compare(req.body.password, user.password);
        if (isPass) {
          let token = jwt.sign({
            _id: user._id,
          });
          apiRes.token = token;
          console.log(token);
          apiRes.success = "Login Successful!";
          apiRes.user = user;
          return res.json(apiRes);
        } else {
          apiRes.failed = "password and email is not matching";
          res.json(apiRes);
        }
      } else {
        apiRes.failed = `There is no account registered with the email id ${req.body.email}`;
        res.json(apiRes);
      }
    } catch (error) {
      next(error);
    }
  },

// google social login

  sociallogin: async (req, res, next) => {
    try {
      console.log("socialloginffff");
      console.log(req.params.id);
      let apiRes = {};
      const client = new OAuth2Client(process.env.CLIENT_ID);

      const ticket = await client.verifyIdToken({
        idToken: req.params.id,
        audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      const userid = payload["sub"];
      console.log(payload);
      const userdetails = {
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
      };
      let user = await userModel.findOne({ email: userdetails.email });
      console.log("USERSIGN");
      console.log(user);
      if (user) {
        let token = jwt.sign({
          _id: user._id,
        });
        apiRes.token = token;
        apiRes.success = "login success";
        apiRes.data = user;
        res.json(apiRes);
      } else {
        apiRes.failed = `There is no account registered with the email id ${userdetails.email}`;
        res.json(apiRes);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  //google social signup

  socialsignup: async (req, res, next) => {
    try {
      console.log("socialsignup");
      console.log(req.params.id);
      let apiRes = {};
      const client = new OAuth2Client(process.env.CLIENT_ID);

      const ticket = await client.verifyIdToken({
        idToken: req.params.id,
        audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      const userid = payload["sub"];
      console.log(payload);
     let usercheck=await userModel.findOne({email:payload.email})
     console.log(usercheck);
     if(!usercheck){
      let user=userModel({
        userName:payload.name,
        email:payload.email,
        password:'nopass',
        image:payload.picture,
        verifyemail:true
      })
      user.save().then((data)=>{
        console.log(data);
        let token = jwt.sign({
          _id: data._id,
        });
        console.log(token);
        apiRes.token = token;
        apiRes.data=data;
        apiRes.success = "added successfully";
        console.log("COMPLETED");
        res.json(apiRes);
      })
     }else{
      console.log("already exist")
      let token = jwt.sign({
        _id: usercheck._id,
      });
      console.log(token);
      apiRes.token = token;
      apiRes.data=usercheck;
      apiRes.success = "signup successfully";
      console.log("COMPLETED");
      res.json(apiRes);
     }
    } catch (error) {
      next(error);
    }
  },

  // forgot password and link send to user mail

  forgotpass:async(req,res,next)=>{
    try {
      console.log(req.body);
      let apiRes={}
     let user=await userModel.findOne({email:req.body.email})
      if(user){
        var mailOptions = {
          from: process.env.Email,
          to: req.body.email,
          subject: "Reset password instructions: ",
          html:
            `<p>hello ${req.body.email}</p>` +
            '<br><p>Someone has requested a link to change your password. You can do this through the link below.</p>'+
            `<a href='http://localhost:4200/resetpass/${user._id}'>Change my password</a>`+
            "<br><p>If you didn't request this, please ignore this email <br>Your password won't change until you access the link above and create a new one.</p>",// html body
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          apiRes.success = `Your password reset instructions have been sent into ${req.body.email}`;
          console.log("REPLAY");
          res.json(apiRes);
        });
      }else{
        apiRes.success = `No account register with this mail ${req.body.email}`;
        res.json(apiRes)
      }
    } catch (error) {
      console.log(error);
      next(error)
    }
  },

  // resetpassword

  resetpassword:async(req,res,next)=>{
    try {
      console.log(req.body);
      let apiRes={}
      let user=await userModel.findOne({_id:req.body.id})
      console.log(user);
      if(user){
        req.body.password = await bcrypt.hash(req.body.password, 10);
        console.log(req.body.password);
        userModel.updateOne({_id:req.body.id},{$set:{password:req.body.password}}).then(()=>{
          apiRes.success="Password updated"
          res.json(apiRes)
        })
      }else{
        apiRes.failed='Id is invalid'
        res.json(apiRes)
      }
     

    } catch (error) {
      next(error)
    }
  },
  blockStatus:(req,res,next)=>{
    try {
      userModel.findOne({_id:res.locals.jwtUSER._id}).then((user)=>{
        res.json(user.status)
      })
    } catch (error) {
      next(error)
    }
  }

};
