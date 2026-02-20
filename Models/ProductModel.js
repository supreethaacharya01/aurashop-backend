const mongoose=require("mongoose")
const productSchema=new mongoose.Schema({
    product_name:{type:String, required:true},
    product_desc:{type:String, required:true},
    product_price:{type:Number, required:true},
    product_image:{type:String, required:false},
    product_qty:{type:Number, required:true},
    categoryId:{type:mongoose.Schema.Types.ObjectId, ref:'Category' ,required:false},
    date:{type:Date,default:Date.now},
    category_name: { type: String }
})

module.exports=mongoose.model('Product', productSchema)