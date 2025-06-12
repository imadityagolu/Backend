const express = require("express");

const router = express.Router();

const fileController = require("../controllers/imageUpload.controller");

const uploader = require("../fileUploader/fileUploader");

//applying middleware
router.post("/api/v1/file/upload", uploader.single("file"), fileController.uploadFile);

router.post("/api/v1/file/share", fileController.shareFile);

// router.get("/api/v1/file/download",);

module.exports = router;