
const mongoose=require('mongoose')
const userSchema =new mongoose.Schema({
    user:{
        type: String,
        required: true,
        maxLength:255,
        minLength:6
    },
    password:{
type: String,
required: true,
minLength:6,
maxLength:1024
    },
    email:{
        type:String,
        required: true,
    }
})
module.exports=mongoose.model('Userbase',userSchema)