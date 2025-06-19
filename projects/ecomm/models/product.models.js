const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    minExp: {
        type: Number,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    }
});

const ProductModel = mongoose.model("products", productSchema);

module.exports = ProductModel;