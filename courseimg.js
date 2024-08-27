const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  imagePath: {
    type: String,
    required: true
  },
  courseName: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,  
    max: 5   
  },
  price: {
    type: Number,
    required: true,
    min: 0   
  }
});

const Course = mongoose.model('Courseimage', CourseSchema);

module.exports = Course;
