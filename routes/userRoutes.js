const express=require('express');
const router=express.Router();
const userModel=require('../models/authModel')
const Joi=require('@hapi/joi')
const {validation}=require('./validation')

//Post route for the process
router.post('/resgistration',async(req,res)=>{
   const {error}=validation(req.body);
   if(error){
       res.status(400).send(error.details[0].message)
       return;
   }
   //to see if the email adress already exits
  const emailExist=await userModel.findOne({email:req.body.email})
  if(emailExist){
      res.send('sorry the email is already associated with another account')
      return
  }


    
    let user=new userModel({
        user:req.body.user,
        password:req.body.password,
        email:req.body.email
    })
    try{
        user=await user.save()
        console.log(user)
    }
    catch(err){
        console.log(err)
    }

})
module.exports=router;