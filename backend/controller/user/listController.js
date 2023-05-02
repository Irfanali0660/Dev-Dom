const listModel = require("../../model/listModel");
const listcategoryModel = require("../../model/listcategoryModel")

module.exports={

  // getlistcategorys

    getlistcate:(req,res,next)=>{
      try {
        listcategoryModel.aggregate([{$match:{status:false}}]).then((listcategory)=>{
            console.log(listcategory);
            res.json(listcategory)
        })
      } catch (error) {
        next(error)
      }
    },

    // add new listing

    addnewlist:(req,res,next)=>{
        try {
            console.log(req.body)
            let newlist=listModel({
              userId:res.locals.jwtUSER._id,
              title:req.body.formData.title,
              details:req.body.formData.details,
              category:req.body.formData.category,
              expdate:req.body.formData.expdate,
              location:req.body.formData.location,
              tag:req.body.tags,
              date:Date.now()
            })
            newlist.save().then(()=>{
              res.json()
            }).catch((error)=>{
              console.log(error);
            })
        } catch (error) {
            next(error)
        }
    },

    // get list

    getlist:(req,res,next)=>{
      try {
        listModel.find().populate('userId').then((list)=>{  
          console.log(list);
          res.json(list)
        })
      } catch (error) {
        next(error)
      }
    }
}