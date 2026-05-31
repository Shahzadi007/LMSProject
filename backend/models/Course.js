const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title:String,
  description:String,
  category:String,
  price:Number,
  instructor:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
},{timestamps:true});

module.exports = mongoose.model("Course", courseSchema);