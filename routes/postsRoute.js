const express=require('express')
const router=express()
const verify=require('./auth')
router.get('/',verify,(req,res)=>{
  res.send('posts data is here')
})
module.exports =router