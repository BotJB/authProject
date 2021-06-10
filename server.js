const express=require('express');
const app=express();
const mongoose=require('mongoose')
const router=require('./routes/userRoutes')
const postsRouter=require('./routes/postsRoute')
mongoose.connect('mongodb://localhost/Users',{ useNewUrlParser: true , useUnifiedTopology: true })
.then(() => {
    console.log('connection created succesfully');
}).catch((err) => {
    console.log(err);
})
app.use(express.json())
 app.use('/api/user',router)
 app.use('/api/posts',postsRouter)

app.get('/',(req,res)=>{
    res.send('welcome to the home page')
})
app.listen(5000,()=>{
    console.log('server is up and running')
})