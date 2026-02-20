const Category=require('../Models/CategoryModel');

const Addcategory= async(req,res)=>{
try {
    const {cname,cdescription}=req.body;

    const newcategory= new  Category({
        category_name:cname,
        category_description:cdescription
    })
    await newcategory.save();
        res.status(201).json({message:"category added" , newcategory})
        // console.log("User Added!!!!!!!!!!!!!!!!")
} catch (error) {
     res.status(500).json({message:"server error",error})
    //    console.log(eror) 
    
}
}

// get thecategory details
const Getcategory =async(req,res)=>{
   try {
     const getcategory =await Category.find(); //fetch users
     res.status(200).json({message:"all category fetched", getcategory})
    console.log( getcategory)
    
   } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    console.log(error)
   }
}

const Deletecategory=async(req,res)=>{
 try {
     const {cid}= req.params;
    const deletecategory= await Category.findByIdAndDelete(cid);
    res.status(200).json({message:"category deleted",deletecategory})

 } catch (error) {
    console.log(error)   
 }
}

//get element by id

const GetcategoryById=async(req,res)=>{
    try {
        const {cid}=req.params; //to take id from req or url

        const onecategory=await Category.findById(cid)//find the id from category model

        if (!onecategory){  //if category not found
            return(res.status(404).json({message:"category not found"}))
        }
        console.log(onecategory)
        return(res.status(200).json({message:"category found",onecategory}))
       

    } catch (error) {
        res.status(500).json({message:"server error",error})
    }
}

const Updatecategory=async(req,res)=>{
try {
    const { cid } = req.params; //holds the value of id
 const updatedcategory = await Category.findByIdAndUpdate(cid, req.body)
  //req.body it holds updated objects (fiels and value sent from client)
  res.status(200).json({message:"category updated",updatedcategory})
 } catch (error) {
  console.log(error)
 }
}

module.exports = {Addcategory , Getcategory, Deletecategory, GetcategoryById , Updatecategory};