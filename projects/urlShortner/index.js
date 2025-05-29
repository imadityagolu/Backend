import express from "express";
const app = express();

//to generate random alphanumeric digits
import { nanoid } from 'nanoid';

import fs from "fs";

//to show html file using express, called - server site rendering
app.get("/", (req, res) => {

    //__dirname not work in ES module so we have to import it
    res.sendFile(import.meta.dirname + "/index.html");
})

//to read the url
app.use(express.urlencoded());

//to store urls in object temproraly
// const urls = {};

app.post("/shorten", (req, res) => {

    //to read the body we get from html
    const longUrl = req.body.longUrl;

    const shortUrl = nanoid(8);

    const workingUrl = new URL(longUrl);

    if(workingUrl){

    //storing urls
    // urls[shortUrl] = workingUrl;

    // //storing data in js file
    const fileResponse = fs.readFileSync("urls.json", "utf8");
    const fileData = JSON.parse(fileResponse);

    const existingUrl = Object.entries(fileData).find(([key, value]) => value === longUrl);

    if(!existingUrl){

    fileData[shortUrl] = workingUrl;
    fs.writeFileSync("urls.json", JSON.stringify(fileData));
    
        //to send the data in request
        res
            .status(200)
            .json({
            success: true,
            shortUrl : `http://localhost:6969/${shortUrl}`
        });

    }
    else{
        res
            .status(500)
            .json({
            success: false,
            shortUrl : `http://localhost:6969/${existingUrl[0]}`,
        });
    }

    }
    else{

        //to send the data in request
        res
        .status(500)
        .json({
            success: false,
            shortUrl : "Provide valide url"
        });
    }

});

//generating api for short url
app.get("/:shortUrl", (req, res) => {

    const shortUrl = req.params.shortUrl;

    const fileResponse = fs.readFileSync("urls.json", "utf8");
    const fileData = JSON.parse(fileResponse);

    const longUrl = fileData[shortUrl];

    if(longUrl){
        //redirecting short urls
        res.redirect(longUrl);
    }
    else {
        res
        .status(404)
        .json({
            success: false,
            shortUrl : "url does not match"
        })
    }
    
});

app.listen(6969, () => console.log("server is up..."));