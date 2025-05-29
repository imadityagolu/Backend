const express = require("express");

const app = express();

//to add image and access it
app.use(express.static(__dirname + "/img"));

const userList = [
    {
        id: 1,
        name: "Aditya",
        profileImage: "/1.jpg"
    },
    {
        id: 2,
        name: "Muku",
        profileImage: "/mario/1.jpg"
    }
];

app.get("/users", (req, res) => {
    res
    .status(200)
    .json({
        success: true,
        results: userList
    })
});

app.listen(6969, () => console.log("server is up"));