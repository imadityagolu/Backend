const express = require("express");

const router = express.Router();

const {
    placeOrder,
} = require("../controllers/order.controllers");

router.post("/placeorder", placeOrder);

module.exports = router;