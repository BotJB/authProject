const jwt=require('jsonwebtoken')
module.exports=function (req,res,next){
    const token=req.header('auth-token')
    if(!token){
        return res.status(401).send('access denied')
    }
    
    try{
        const verified=jwt.verify(token,'shhhhhhhhhh')
        req.user=verified
        next()

    }
    catch(err){
        console.log(err);
    }
}