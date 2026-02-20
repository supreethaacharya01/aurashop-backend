const express = require("express")
const {Addcategory, Getcategory, Deletecategory, GetcategoryById, Updatecategory} = require("../Controller/CategoryController")
const router = express.Router();


router.post("/Addcategory" , Addcategory) 
router.get('/Getcategory' , Getcategory)
router.delete('/Deletecategory/:cid' , Deletecategory)
router.get('/GetcategoryById/:cid', GetcategoryById);
router.put('/Updatecategory/:cid' , Updatecategory)


module.exports = router
