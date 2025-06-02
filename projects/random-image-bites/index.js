const express = require("express");
const app = express();

const axios = require("axios");

require("dotenv").config();
const PORT = process.env.PORT;

app.use("/api/v1/random/image", async (req, res) => {
    try {
        const response = await axios.get("https://api.api-ninjas.com/v1/randomimage",{
            headers: {
                "X-Api-Key": process.env.API_KEY,
                "Content-Type": "image/jpg",
            },
            responseType: "arraybuffer",
        });

    if(response.data){
        console.log("Api is working !!")

        const image = Buffer.from(response.data, "binary").toString("base64");
        
        res.status(200).json({
            success: true,
            imageLink: `data:image/jpeg;base64,${image}`,
        });
    }
    else{
        console.log("No image available")
        res.status(404).json({
            success: false,
            imageLink: "No image available",
        });
    }

    } catch(error){
        console.log("Server/Api is not working")
        res.status(500).json({
            success: false,
            message: "Server/Api is not working"
        });
    }
});

app.listen(PORT, () => {console.log(`server is up at http://localhost:${PORT}/api/v1/random/image`)});
