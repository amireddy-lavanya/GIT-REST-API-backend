const express = require('express');
const app = express();
const dotenv = require('dotenv').config();

const jwt = require('jsonwebtoken');
const postRoute = require('./Routes/post')
const userRoute = require('./Routes/user')

app.use(express.json())
app.use('/posts',(req,res,next)=>{
    
    if(req.headers.authorization){
        console.log(req.headers.authorization)
        const token=req.headers.authorization?.split(" ")[1];
        console.log(token)
        if(token){
            jwt.verify(token,process.env.JWT_SECRET_KEY,function(err,decoded){
                if(err){
                    return res.status(403).json({
                        status:"failed",
                        message:"not a valid token"
                    })
                }
                console.log(decoded);
                req.user=decoded._id;
                next()
            })
        }
    }else{
        return res.status(403).json({
            status:"failed",
            message:"unauthorized"
        })
    }
})

app.use('/',userRoute)
app.use('/posts',postRoute);

module.exports= app;
