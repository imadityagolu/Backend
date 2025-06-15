const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user.routes");
const mongoose = require("mongoose");

const app = express();
dotenv.config();

//middleware
app.use(express.json());


//bd connection
mongoose.connect(process.env.DB_URL)
.then(()=> console.log("Database connected successfully"))
.catch( error => console.log(`Error ${error}`));

//routes -> controller -> models
app.use("/api/v1/user", userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, console.log(`server is up at port - http://localhost:${PORT}`));