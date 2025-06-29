const express = require("express");
const router = express.Router();
const authorizer = require('../middlewares/rbac');

const {
    createCoupon,
    listCoupons
} = require('../controllers/coupon.controllers');

router.post("/create", authorizer(["ADMIN", "SELLER"]), createCoupon);
router.get("/list", listCoupons);

module.exports = router;