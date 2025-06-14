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
        const file = await FileModel.findById(req.body._id);
        const name = file.modifiedFileName;
        const link = "http://localhost:8056/uploads/" + name;
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

const downloadFile = async (req, res) => {
    const file = await FileModel.findById(req.params.fileId);
    const path = file.path;
    res.download(path, file.originalFileName);
    res.end("download end point : " + file.originalFileName + " - " + path);
    return;
};

const fileController = {
    uploadFile,
    shareFile,
    downloadFile
}

module.exports = fileController;