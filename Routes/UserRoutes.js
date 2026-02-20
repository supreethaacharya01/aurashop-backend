const express=require('express')

const {Adduser ,GetuserById,Deleteusers ,Getuser,Login,GetProfile, UpdateProfile}=require('../Controller/Usercontroller')
const {authuser}=require("../Middleware/Authuser")
const router=express.Router();

router.post('/Adduser' , Adduser)
router.get('/Getuser', Getuser)
router.post("/Login" , Login) 
router.get('/GetuserById/:uid' , GetuserById)
router.delete('/Deleteusers/:uid' , Deleteusers)
router.get('/GetProfile',authuser,GetProfile)
router.put('/UpdateProfile',authuser,UpdateProfile)

module.exports = router