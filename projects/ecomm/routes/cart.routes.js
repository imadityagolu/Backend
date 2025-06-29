const express = require("express");

const router = express.Router();

const {
    addToCart,
    getCart
} = require('../controllers/cart.controllers');

router.post("/add", addToCart);

router.get("/list", getCart);

module.exports = router;