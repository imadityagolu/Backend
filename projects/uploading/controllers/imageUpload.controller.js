const FileModel = require('../models/imageUpload.models');

const uploadFile = async (req, res) => {
    //importing multer data
    await FileModel.create({
        originalFileName : req.file.originalname,
        modifiedFileName : req.file.filename,
        size : req.file.size,
        user : "aditya@example.com",
        path : req.file.path
    });

    res.json({
        success: true,
        message: "file uploaded succeessfully"
    })
};

const shareFile = async (req, res) => {
    try {
        const link = "http://localhost:8056/uploads/" + req.body._id;
        const file = await FileModel.findById(req.body._id);
        if(!file){
            throw new Error("id not found");
        }
        res.json({
        success: true,
        message: "share link : " + link
        });
    } catch (error){
        res.status(400).json({
                success: false,
                message: "invalid id"
        });
    }
    
};

const fileController = {
    uploadFile,
    shareFile
};

module.exports = fileController;