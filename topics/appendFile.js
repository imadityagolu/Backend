/**
 * Edit file
 * fs => file system
 * fs.appendFile("filename",fileContent, (error) => {});
 * note: it will always add the new content withot editing the previous data
*/

// using CJS not ESM
const fs = require("node:fs");

const editFile = () => {

    const fileNewContent = "\ncontent line 1";

    fs.appendFile("demo.txt", fileNewContent, (error) => {
        if(error){
            console.log("Error while appending")
            return;
        }
        console.log("File appended successfully");
    });

}

editFile();