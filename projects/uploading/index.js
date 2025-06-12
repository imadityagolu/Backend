const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded());

dotenv.config();
const db_url = process.env.DB_URL;

const PORT = 8056;

mongoose.connect(db_url)
.then(() => console.log(`db connected successfully`))
.catch(error => console.log(`Error connecting to db`, error));

//to view file
app.use("/uploads", express.static(path.join(__dirname, "uploaded_files")));

const fileRoute = require("./routs/imageUpload.routs");
app.use(fileRoute);

app.listen(PORT, console.log(`server is up at Port - http://localhost:${PORT}`));