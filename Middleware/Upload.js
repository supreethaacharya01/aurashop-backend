const multer =require('multer');
const storage=multer.diskStorage({

    destination:function(req,file,cb){
        cb(null,'Uploads/')  //this is a folderwhere files will be saved
    },
    filename:function(req,file,cb){  //generate a unique name of datetime and some random numbers
       const uniquename=Date.now()+ "-" + Math.round(Math.random()*1E9)
       cb(null,file.fieldname + '-' + uniquename)
    }
})
const upload=multer({storage:storage})
module.exports=upload;
//set the destination folder where file should be save or stored