const User= require('../Models/UserModels')
const bcrypt=require("bcryptjs")
const jwt=require('jsonwebtoken')
const SECRET_KEY="mernstack";

const Adduser=async(req,res)=>{
    try {
        const {uname,uemail,upassword,uphone,uaddress}=req.body;
         const hashpassword= await bcrypt.hash(upassword,10)
        const  newuser=new User({
            name:uname,
            email:uemail,
            password:hashpassword,
            phone:uphone,
            address:uaddress
        })
       await newuser.save();
       res.status(201).json({message:"user created" , newuser})
       
        
    } catch (error) {
         res.status(500).json({message:"server error",error})
    }
}

// get the user details
const Getuser =async(req,res)=>{
   try {
     const getusers =await User.find(); //fetch users
     res.status(200).json({message:"all users fetched", getusers})
    console.log( getusers)
    
   } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    console.log(error)
   }
}

// get the single user details by their id
const GetuserById = async(req,res)=>{
    try {
        const {uid}= req.params; //get id from url
        const oneuser = await User.findById(uid);
        if(!oneuser){
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({message:"user found",oneuser})
        console.log(oneuser)

    } catch (error) {
         res.status(500).json({message:"server error",error})
      console.log(error)  
    }
}

//to delete users 
const Deleteusers=async(req,res)=>{
    try {
        const {uid}= req.params; 
        const deleteuser=await  User.findByIdAndDelete(uid);
         res.status(200).json({message:"user deleted",deleteuser})
    } catch (error) {
        console.log(error) 
    }
}

// Controller/UserController.js - In Login function
const Login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const matcheduser = await User.findOne({ email: email });
        
        if (!matcheduser) {
            return res.json({success: false, message: "Invalid user"});
        }
        
        const checkpass = await bcrypt.compare(password, matcheduser.password);
        if (!checkpass) {
            return res.json({success: false, message: "Invalid credentials"});
        }
        
        const Token = jwt.sign(
            { id: matcheduser.id, role: matcheduser.role },
            SECRET_KEY
        );
        
        console.log(Token);
        res.json({
            success: true, 
            message: "Login successfully", 
            Token, 
            role: matcheduser.role, // This will be 'admin' for admin user
            user: {
                id: matcheduser._id,
                name: matcheduser.name,
                email: matcheduser.email
            }
        });
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "server error"});
    }
}

const GetProfile=async(req,res)=>{
try {
    const iduser = req.userId.id;
    const user=await User.findById(iduser);
    if(!user){
        return(
            res.status(404).json({message:"user not found"})
        )
    }
    res.status(200).json({message:"user  found" , user})
} catch (error) {
    console.log(error)
    res.status(500).json({message:"server error"})
}
}

const UpdateProfile=async(req,res)=>{
    try {
        const iduser = req.userId.id;
    const user=await User.findById(iduser);
    if(!user){
        return(
            res.status(404).json({message:"user not found"})
        )
    }
    // res.status(200).json({message:"user  found" , user})
    const updateform=({
        name:req.body.uname,
        email:req.body.uemail,
        phone:req.body.uphone,
        address:req.body.uaddress,
    })
    const updateprofile= await User.findByIdAndUpdate(iduser,updateform,{new:true})
    res.status(200).json({message:"profile updated successfully",users:updateprofile})

    } catch (error) {
        res.status(500).json({message:"server error"})
    }
}

module.exports={Adduser, Getuser, GetuserById, Deleteusers, Login, GetProfile, UpdateProfile};
