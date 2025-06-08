const express = require("express");
const app = express();

const PORT = 7894;

const fs = require("fs").promises;

const path = require("path");
const filePath = path.join(__dirname, "logg.json");

const writeFile = async(logObject) => {
    try{
        try{
            await fs.readFile(filePath);
            const fileContent = await fs.readFile(filePath, "utf8");
            const data = JSON.parse(fileContent);
            await fs.writeFile(filePath, JSON.stringify([...data, logObject]));
        }catch(error){
            await fs.writeFile(filePath, JSON.stringify([logObject]));
        }

    } catch(error){
        console.log("Error : " + error);
        res.status(400).json({
            success: false,
            message: "Error",
        })
    }
};

app.get("/user", (req, res) => {

    console.log("GET api hit - "+ req.url);

    res.status(200).json({
        success: true,
        message: "GET api hit - "+ req.url,
    });

    writeFile({
        "Requested Url": req.url,
        "Method": req.method,
        "IP": req.ip,
        "Time": new Date().toString(),
    });
});

app.use("", (req, res,) => {

    console.log("Api hit - "+ req.url);

    res.status(200).json({
        success: true,
        message: "Api hit - "+ req.url,
    });

    writeFile({
        "Requested Url": req.url,
        "Method": req.method,
        "IP": req.ip,
        "Time": new Date().toString(),
    });
});

app.listen(PORT, () => console.log(`server is up at port - http://localhost:${PORT}`))