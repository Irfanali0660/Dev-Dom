const listModel = require("../../model/listModel");
const listcategoryModel = require("../../model/listcategoryModel")
// const { maptilerClient }=require('@maptiler/client')

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

    addnewlist:async(req,res,next)=>{
        try {
            console.log(req.body)
            let newlist=listModel({
              userId:res.locals.jwtUSER._id,
              title:req.body.formData.title,
              details:req.body.formData.details,
              category:req.body.formData.category,
              expdate:req.body.formData.expdate,
              location:req.body.location.text,
              tag:req.body.tags,
              date:Date.now()
            })
//             const NodeGeocoder = require('node-geocoder');

// const options = {
//   provider: 'google',
//   // Optional depending on the providers
//   apiKey: 'HFW0X0XCWk0Psn00M5KjKmfsSqpcl1yv', // for Mapquest, OpenCage, Google Premier
//   formatter: null // 'gpx', 'string', ...
// };

// const geocoder = NodeGeocoder(options);

// // Using callback
// async function geocodeAddress() {
//   try {
//     const result = await geocoder.geocode('Kondotty');
//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// }

// geocodeAddress();


            newlist.save().then(()=>{
              res.json()
            }).catch((error)=>{
              console.log(error);
            })
        } catch (error) {
          console.log(error);
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