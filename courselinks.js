const mongoose=require('mongoose')

const enrolllinks=new mongoose.Schema({
  courseId:{
    type:String,
    required:true
  },
  coursetitle: {
    type: String,
    required: true
  },
  about:{
    type:String,
    required:true
  },
  courselinks:{
    type:[String]
  },
  coursehead:{
    type:[String]
  }

})

module.exports = mongoose.model("courselinks", enrolllinks);
