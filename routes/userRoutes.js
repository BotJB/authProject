const express=require('express');
const router=express.Router();
const userModel=require('../models/authModel')
const Joi=require('@hapi/joi')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const {validation,loginValidation}=require('./validation')

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
const salt=await bcrypt.genSalt(10);

const hashedPass=await bcrypt.hash(req.body.password,salt);



    
    let user=new userModel({
        user:req.body.user,
        password:hashedPass,
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
//Post routes
router.post('/login',async(req,res)=>{
    const {error}=loginValidation(req.body);
    if(error){
        res.send(error.details[0].message)
        return;
    }
    const user=await userModel.findOne({email:req.body.email})
    if(!user){
        res.status(400).send('invalid email or password')
        return
    }
    const validPass=await bcrypt.compare(req.body.password,user.password)
    if(!validPass){
        res.status(400).send('invalid password')
        return
    }
    const token=jwt.sign({id:user._id},'shhhhhhhhhh')
    
    res.header('auth-token',token).send(token)
    

})
module.exports=router;