import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";


const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"src/uploads/")
    },
    filename : (req,file,cb) =>{
        const uniqueSuffix = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, uniqueSuffix);
    }
})


export const upload = multer({
    storage:storage,
    limits:{ fileSize:5*1024*1024},
    fileFilter:(req,file,cb)=>{

        const fileTypes = /jpeg|jpg|png|gif|pdf|csv/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype)

        if(extname && mimeType){
            return cb(null,true)
        }else{
            return cb(new Error("Only images and Pdfs are allowed"))
        }

    }
})