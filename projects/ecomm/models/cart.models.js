const mongoose = require("mongoose");

const productShape = {
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "products",
        required: true
    },
    qty: {
        type: Number,
        required: true,
        min: 1
    }
};

const cartSchema = mongoose.Schema({
    products: {
        type: [productShape],
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true
    }
},{
    timestamps: true
});

const CartModel = mongoose.model("carts", cartSchema);

module.exports = CartModel;