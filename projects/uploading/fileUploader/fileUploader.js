const path = require("path");
const { v4: uuidv4 } = require('uuid');

//multer setup for file 
//1. storage path
const fileStoragePath = path.join(__dirname, "../uploaded_files");

const multer = require("multer");

//2. storage type - disk
const storage = multer.diskStorage({
    destination: fileStoragePath,
    filename: (req, file, cb) => {
        const fileName = uuidv4() + path.extname(file.originalname);
        cb(null, fileName);
    }
});

//3. uploader function
const uploader = multer({
    storage: storage
});

module.exports = uploader;