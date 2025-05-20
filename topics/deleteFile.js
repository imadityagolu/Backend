const fs = require("node:fs");

const deleteFile = () => {

    const filename = "demo.txt";

    fs.unlink(filename, (error) => {
        if(error) {
            console.log("Error while deleting file");
            return;
        }
        console.log("File deleted");
    })
};

deleteFile();