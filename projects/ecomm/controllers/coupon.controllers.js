const CouponModel = require('../models/coupon.models');

const createCoupon = async (req, res) => {

    await CouponModel.create(req.body);

    console.log("Create Coupon api hit");

    res.status(200).json({
        succeess: true,
        message: "Coupon created"
    });
}

const listCoupons = async (req, res) => {
    const coupons = await CouponModel.find();
    res.status(200).json({
        succeess: true,
        message: "Coupon created",
        data: coupons
    });
}

const couponController = {
    createCoupon,
    listCoupons,
}

module.exports = couponController;