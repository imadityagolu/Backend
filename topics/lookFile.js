const fs = require("node:fs");

const lookFile = () => {

    const filename = "demo.txt";

    const fileExist = fs.existsSync(filename);

    if(fileExist){
        fs.unlink(filename, (error) => {
        if(error) {
            console.log("Error while deleting file");
            return;
            }
        console.log("File deleted");
        })
    }
    console.log("File dose not exist");
};

lookFile();