const router=require('express').Router();
const Post=require('../Model/Post');

const bodyParser=require("body-parser");
const app = require('../App');
const { json } = require('body-parser');
router.use(bodyParser.json());

router.post('/',async(req,res)=>{
   try{
    const {title,body,image}=req.body;
    console.log(req.user)
    const post=await Post.create({
        title:title,
        body:body,
        image:image,
        user:req.user
    })
    res.status(200).json({
        status:"post created",
        data:post
    })
   }catch(e){
       res.status(403).json({
        status:"failure",
        message:e.message
       })
   }
})

router.put('/:postId',async(req,res)=>{
    try{
        console.log(req.params.postId)
        
        const userf=await Post.find({"_id":req.params.postId})

        console.log(userf)
        console.log(userf[0].user,req.user)
        console.log(req.body)
        if(userf[0].user==req.user){
           console.log(req.body)
     
        const update=await Post.updateMany(req.body)
         
     res.status(200).json({
         status:"success",
      
     })
    }
}
    catch(e){
        res.status(403).json({
         status:"failure",
         message:e.message
        })
    }
 })


 
router.delete('/:postId',async(req,res)=>{
    try{
        const user=await Post.find({"_id":req.params.postId})
        if(user[0].user==req.user){
     
     
        const deleteUser=await Post.deleteOne({"_id":req.params.postId})
     

     
     res.status(200).json({
         status:"Successfully deleted",
      
     })
    }
    }catch(e){
        res.status(403).json({
         status:"failure",
         message:e.message
        })
    }
 })

  
router.get('/',async(req,res)=>{
    try{
     
       console.log(req.user)
        const User=await Post.find({"user":req.user})
        console.log(User)

     
     res.status(200).json({
         post:User
      
     })
    }catch(e){
        res.status(403).json({
         status:"failure",
         message:e.message
        })
    }
 })

 


module.exports=router;