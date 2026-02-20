const mongoose=require("mongoose");
const categorySchema= new mongoose.Schema({
    category_name:{type:String, required:true},
    category_description:{type:String,required:true},
    date:{type:Date,default:Date.now}
})
module.exports=mongoose.model('Category', categorySchema)