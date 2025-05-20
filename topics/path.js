const path = require("node:path");

// for location upto file's folder
console.log(__dirname);


// for location of complete path
console.log(__filename);


// to go in different directory and selecting another file
const foldername = "projects";
const filename = "helloWorld.js";
const joinedpath = path.join(__dirname, "../", foldername, filename);

console.log(joinedpath);

// console.log(path.parse(joinedpath));
// console.log(path.extname(joinedpath));