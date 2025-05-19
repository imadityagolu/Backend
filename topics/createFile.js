/**
 * Creating new file
 * fs => file system
 * fs.writeFile("filename","file contents", callbackfunction)
 * note: if we again run the command it will replace the previous file and make new again with same content
*/

// using CJS not ESM
const fs = require("node:fs");

const createFile = () => {

    const fileName = "demo.txt";
    const fileContents = "Hi Aditya";

    const fileNotification = (error) => {
        if(error){
            console.log("ERROR")
            return;
        }
        console.log("Created Successfully")
    };

    fs.writeFile(fileName, fileContents, fileNotification);

}

createFile();