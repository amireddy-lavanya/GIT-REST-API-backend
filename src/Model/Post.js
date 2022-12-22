const mongoose=require('mongoose');
const {ObjectId} = mongoose.Schema; 

const postSchema=new mongoose.Schema({
  title:{type:String},
  body:{type:String},
  image:{type:String,default:""},
  user: {
    type :  ObjectId,
    ref :  "users",
}

})

const post=mongoose.model('posts',postSchema)

module.exports=post;