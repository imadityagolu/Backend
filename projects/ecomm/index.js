const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const authMiddleware = require("./middlewares/auth");
const cartRoutes = require('./routes/cart.routes');
const couponRoutes = require('./routes/coupon.routes');
const orderRoutes = require('./routes/order.routes');

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
app.use("/api/v1/product", productRoutes);
app.use(authMiddleware);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/coupon", couponRoutes);
app.use("/api/v1/order", orderRoutes);

const PORT = process.env.PORT;
app.listen(PORT, console.log(`server is up at port - http://localhost:${PORT}`));