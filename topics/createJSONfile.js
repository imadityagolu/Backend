const fs = require("node:fs");

const data = [
    {
        id: 1,
        name: "addu"
    },
    {
        id: 2,
        name: "muku"
    }
];

fs.writeFile("jsonFile.json", JSON.stringify(data), (error) => {
    if(error){
        console.log("Error while creating JSON file");
        return;
    }
    console.log("File created");
});
