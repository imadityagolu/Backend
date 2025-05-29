const express = require("express");

const app = express();

//1. to send data(json) from frontend to server/terminal
app.use(express.json());

//2. for url encoded data
app.use(express.urlencoded());

app.post("/register", (req, res) => {

    //2. to retreave data from frontend-body to terminal
    console.log(req.body);

    //1. to show data in postman
    res.json({
        success: true,
        message: "Returning"
    })
})

app.listen(6969, () => console.log("server is up"));