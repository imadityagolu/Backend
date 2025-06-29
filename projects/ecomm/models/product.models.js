const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    keywords: {
        type: [String],
        required: true
    }
});

const ProductModel = mongoose.model("products", productSchema);

module.exports = ProductModel;