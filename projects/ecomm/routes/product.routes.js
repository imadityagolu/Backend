const express = require("express");
const routes = express.Router();

const { listProduct, createProduct } = require("../controllers/product.controllers");

routes.get("/list", listProduct);

routes.post("/create", createProduct);

module.exports = routes;