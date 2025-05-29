const express = require("express");

const app = express();

//to save PORT in .env file and get it from there
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;

app.use((req, res, next) => {
    console.log("M1");

    //to forward data from one middleware to another
    req.firstName = "data pass by M1";

    //to go in next middleware
    next();
});

app.use((req, res, next) => {

    //to print passed data 
    console.log(req.firstName);

    req.lastName = "data pass by M2";
    next();
});

// if no api matches - true for all the methods
app.use((req, res, next) => {
    console.log("Start");
    if(req.query.apikey == "12345"){
        console.log("M2", req.firstName, req.lastName);
        res.json({
        success: true,
        message: "Requested Api"
            });
    }
    else {
        next();
    }

    // res.json({
    //     success: false,
    //     message: "Start of Api"
    // })
});

app.get("/todo", (req, res, next) => {
    console.log("Todo - GET");

    try {
    if(req.query.apikey == "12345"){
        res
        .status(200)
        .json({
        success: true,
        message: "Todo GET Requested Api"
            });
    }
    else {
        res
            .status(400)
            .json({
            success: false,
            message: "Todo GET Not Requested Api"
        });
    }
    }
    catch (error) {
        console.log("Error : ", error)
        res
            .status(400)
            .json({
            success: false,
            message: "Error occured in todo"
        });
    }
});

app.get("/user", (req, res, next) => {
    console.log("User - POST");
    res.json({
        success: true,
        message: "User GET api"
    })
});

// if no api matches - true for all the methods
app.use((req, res, next) => {
    console.log("End");
    res.json({
        success: false,
        message: "End of Api"
    })
});

// error handling middleware
app.use((error, req, res, next) => {
    console.log("Error", error);
    res.status(500)
        .json({
        success: false,
        message: "Internal server error"
            })
});

app.listen(6969, () => console.log("server working..."));