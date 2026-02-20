const mongoose=require('mongoose')
require('dotenv').config()

const mongoURL=process.env.URI;
const  ConnectToMongo= async()=>{
   
    try {
        await mongoose.connect(mongoURL)
        console.log("connected to mongoose")
    } catch (err) {
        console.log(err)
    }
}
 module.exports=ConnectToMongo;
