const mongoose=require('mongoose')

const enrolldata=new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  courseId:{
    type:String,
    required:true
  },

})

module.exports = mongoose.model("enrollcourse", enrolldata);
