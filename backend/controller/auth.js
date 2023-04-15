const userModel = require("../model/userModel");
const jwt=require('../helpers/jwt')
const bcrypt=require('bcrypt');



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
                  })
            }else{
                apiRes.failed = "This email already exist";
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