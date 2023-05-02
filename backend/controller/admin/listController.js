const listModel = require("../../model/listcategoryModel");

module.exports={


    // add new list

    addlist:(req,res,next)=>{
        try {
            console.log("ADDLIST");
            console.log(req.body);
            let list=new listModel({listcategory:req.body.listcategory,description:req.body.description})
            list.save().then(()=>{
                res.json({success:"added succesfully"})
            }).catch((error)=>{
                console.log(error)
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    },

    // get all list 

    adgetlist:(req,res,next)=>{
        try {
            listModel.find().then((data)=>{
                
                res.json(data)
            })
        } catch (error) {
            next(error)
        }
    },

    // list status list or unlist

    liststatus:async(req,res,next)=>{
        console.log(req.body);
        if(req.body.listid){
            let liststatus=await listModel.findOne({_id:req.body.listid})
              if(liststatus){
                console.log('status');
                  if(liststatus.status==true){
                      listModel.updateOne({_id:req.body.listid},{$set:{status:false}}).then((data)=>{
                        console.log(data);
                          res.json()
                      })
                  }else{
                      listModel.updateOne({_id:req.body.listid},{$set:{status:true}}).then((data)=>{
                        console.log(data);  
                        res.json()
                      })
                  }
              }
          }
    }

}