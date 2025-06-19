const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const authMiddleware = require("./middlewares/auth");

const app = express();
dotenv.config();

//middleware
app.use(express.json());
app.use(cors());

//bd connection
mongoose.connect(process.env.DB_URL)
.then(()=> console.log("Database connected successfully"))
.catch( error => console.log(`Error ${error}`));

//routes -> controller -> models
app.use("/api/v1/user", userRoutes);
app.use(authMiddleware);
app.use("/api/v1/product", productRoutes);

const PORT = process.env.PORT;
app.listen(PORT, console.log(`server is up at port - http://localhost:${PORT}`));