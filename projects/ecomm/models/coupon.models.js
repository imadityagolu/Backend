const mongoose = require("mongoose");

const couponSchema = mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    minOrderValue: {
        type: Number,
        required: true
    },
    discountPercent: {
        type: Number,
        required: true
    },
    maxDiscountValue: {
        type: Number,
        required: true
    }
});

const CouponModel = mongoose.model("coupon", couponSchema);

module.exports = CouponModel;