// const orderModel = require("../models/order.modules");

const dayjs = require("dayjs");
const isBetween = require("dayjs/plugin/isBetween");
dayjs.extend(isBetween);

const CartModel = require('../models/cart.models');
const CouponModel = require("../models/coupon.models");
const ProductModel = require('../models/product.models');
const orderModel = require('../models/order.modules');

const placeOrder = async (req, res) => {

    const userCart = await CartModel.findOne({userId: req.user._id}, { products: 1, _id: 1})
    .populate("products.productId");

    //check if user have items in cart or not
    if(!userCart){
        return res.status(400).json({
            success: false,
            message: "Cart is empty"
        });
    }

    //check if items available is less than stock
    const productsAvailable = userCart.products.every(p => p.productId.stock >= p.qty);
    if(!productsAvailable){
        return res.status(200).json({
            success: true,
            message: "Product out of limit"
        });
    }

    //calculate the sum of items
    const total = userCart.products.reduce((acc, cv) => acc + (cv.productId.price * cv.qty), 0);
    
    //check if there is coupon
    let finalDiscount = 0;
    if(req.body.coupon){
        const coupon = await CouponModel.findOne({ code: req.body.coupon });

        if(!coupon){
            return res.status(400).json({
                success: false,
                message: "invalide coupon"
            });
        }

        if(total < coupon.minOrderValue){
            return res.status(400).json({
                success: false,
                message: "Order does not meet min purchase value"
            });
        }

        //date comparison
        const currentDate = dayjs();
        const startDate = dayjs(coupon.startDate);
        const endDate = dayjs(coupon.endDate);

        const validtime = currentDate.isBetween(startDate, endDate);

        if(!validtime){
            return res.status(400).json({
                success: false,
                message: "expired coupon"
            });
        }

        //applying discount
        const discountValue = (total * coupon.discountPercent) / 100 ;
        const maxDiscountValue = coupon.maxDiscountValue;
        
        finalDiscount = Math.min(discountValue, maxDiscountValue);
        
    }

    const grandTotal = total - finalDiscount;

    //reduce the quantity
    for(let product of userCart.products){
        await ProductModel.findByIdAndUpdate(product.productId._id, {
            $inc: {
                stock: -product.qty
            }
        });
    }

    //storing order
    await orderModel.create({
        products: userCart.products,
        user: req.user._id,
        coupon: req.body.coupon,
        modeOfPayment: req.body.paymentMode,
        orderTotal: grandTotal,
        orderStatus: req.body.paymentMode === "ONLINE" ? "PAYMENT_PENDING" : "IN_TRANSIT",
        deliveryAddress: req.user.address
        }
    );

    
    //check payment mode
    if(req.body.paymentMode === "ONLINE"){

    }

    if(req.body.paymentMode === "COD"){

    }

    //delete the cart
    await CartModel.findByIdAndDelete(userCart._id)

    res.status(200).json({
        success: true,
        message: "Order Place api hit",
        data: userCart
    });
};

const orderController = {
    placeOrder
};

module.exports = orderController;