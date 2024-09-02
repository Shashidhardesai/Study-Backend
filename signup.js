const mongoose=require('mongoose')

const signupdata=new mongoose.Schema({
  username: {
    type: String,
  },
  email:{
    type:String,
    
  },
  password:{
    type:String,
    
  },
  imagePath: {
    type: String,
  }
})

const signdata=mongoose.model("signups",signupdata)

module.exports=signdata;