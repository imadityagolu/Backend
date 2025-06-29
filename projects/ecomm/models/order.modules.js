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

const orderSchema = mongoose.Schema({
    products: {
            type: [productShape],
            required: true
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "users",
            required: true
        },
        coupon: {
            type: String,
            required: false,
            default: ""
        },
        modeOfPayment: {
            type: String,
            required: true,
            enum: ["ONLINE", "COD"]
        },
        orderTotal: {
            type: Number,
            required: true,
            min: 0
        },
        orderStatus: {
            type: String,
            required: true,
            enum: ["IN_PROGRESS", "PAYMENT_PENDING", "PAYMENT_SECCESS", "IN_TRANSIT", "OUT_FOR_DELIVERY", "DELIVERED", "EXCHANGE"]
        },
        deliveryAddress: {
            addressLine1: {
                type: String,
                required: true
            },
            addressLine2: {
                type: String,
                required: false,
                default: ""
            },
            landMark: {
               type: String,
                required: false,
                default: ""
            },
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            pincode: {
                type: String,
                required: true
            }
        }
}, {
    timestamps: true
});

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;