const fs = require("node:fs");

const fileName = "demo.txt";

fs.readFile(fileName,(error, data) => {
    if(error){
        console.log("Error while reading file")
        return;
    }
    const content = data.toString();
    console.log("File read");
    
    const newContent = content + "\nNew Line";

    const notification = (error) => {
        if(error){
            console.log("Error while creating file")
            return;
        }
        console.log("File edited")
    }
    
    fs.writeFile(fileName, newContent, notification);

});
