const app=require('./App');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
mongoose.set('strictQuery', true);

dotenv.config();
console.log(process.env.DATABASE_url)
mongoose.connect(process.env.DATABASE_url,{useNewUrlParser: true},(err)=>{
    if(err){
        console.log(err.message)
    }else{
    console.log('connected to db')
    }
})

app.listen(3000,()=>{
    console.log("server is up")
})