/**
 * reading file
 * fs => file system
 * fs.readFile("filename",(err,data) => {});
 * note: the result will be come in buffer aray so convert it into string
*/

// using CJS not ESM
const fs = require("node:fs");

const readFile = () => {

    fs.readFile("demo.txt",(error,data) => {
        if(error){
            console.log("ERROR while reading file")
            return;
        }
        console.log(data.toString())
    });
}

readFile();