const mongoose =require('mongoose')

const UserSchema= new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    phone:{type:Number},
    address:{type:String},
    date:{type:Date  ,default:Date.now},   
     role: { 
        type: String, 
        enum: ['user', 'admin'],  // Only these two values allowed
        default: 'user'            // Everyone is 'user' by default
    }
})

module.exports=mongoose.model("Users" , UserSchema);