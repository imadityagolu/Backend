/**
 * fs.writeFile("filename","file contents", callbackfunction)
*/
const fs = require("node:fs");

const fileName = "demo.txt";
const fileContents = "Hi Aditya";

const fileNotification = (err) => {
    if(err){
        console.log("ERROR")
        return;
    }
    console.log("Created Successfully")
};

fs.writeFile(fileName, fileContents, fileNotification)