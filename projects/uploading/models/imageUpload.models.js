const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
    originalFileName: {
        type: String,
        required: true
    },
    modifiedFileName: {
        type: String,
        required: true
    },
    size: {
        type: Number
    },
    user:{
        type: String,
        default: "john@example.com"
    },
    path: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const FileModel = mongoose.model("files", fileSchema);

module.exports = FileModel;