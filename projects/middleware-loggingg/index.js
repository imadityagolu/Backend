const express = require("express");
const app = express();

const PORT = 7894;

app.get("/user", (req, res) => {

    console.log("GET api hit - "+ req.url + "\nMethod: " + req.method + "\nIP: " + req.ip + "\nTime: " + new Date().toString());

    res.status(200).json({
        success: true,
        message: "GET api hit - "+ req.url,
        method: req.method,
        ip : req.ip,
        time: new Date().toString(),
    });

});

app.use("", (req, res,) => {

    console.log("Api hit - "+ req.url + "\nMethod: " + req.method + "\nIP: " + req.ip + "\nTime: " + new Date().toString());

    res.status(200).json({
        success: true,
        message: "Api hit - "+ req.url,
        method: req.method,
        ip : req.ip,
        time: new Date().toString(),
    });

});

app.listen(PORT, () => console.log(`server is up at port - http://localhost:${PORT}`))