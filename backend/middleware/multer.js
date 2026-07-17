import multer from "multer";

const storage=multer.diskStorage({
    filename:function(req,file,callback){
        callback(null,file.originalname)
    }
    //for upload file in a folder
    
    // destination:(req,file,callback)=>{
    //     callback(null,"uploads/")
    // }
})

const upload =multer({storage})

export default upload;