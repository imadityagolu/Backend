const CartModel = require('../models/cart.models');

const addToCart = async (req, res) => {
    const cart = await CartModel.findOne({
        userId: req.user._id
    });

    if(!cart){
        // cannot send data from body, have to make like schema
        const cartData = {
            products: [
                {
                    productId: req.body.productId,
                    qty: req.body.qty
                }
            ],
            userId: req.user._id
        };

        //storing in database
        await CartModel.create(cartData);

        res.json({
            success: true,
            message: "Cart updated successfully"
        });

    } else {

        // const productExists = cart.products.some(product => product.productId == req.body.productId);
        const indexOfProduct = cart.products.findIndex(product => product.productId == req.body.productId);

        if (indexOfProduct > -1) {
            cart.products[indexOfProduct].qty = cart.products[indexOfProduct].qty + req.body.qty;
            await cart.save();
        }
        else {
        // await CartModel.findByIdAndUpdate(cart._id, {
        //     $push: {
        //         products: {
        //             productId: req.body.productId,
        //             qty: req.body.qty
        //         }
        //     }
        // });

        // 2nd method - java method
        cart.products.push({
            productId: req.body.productId,
            qty: req.body.qty
        });
        await cart.save();

        }
    }

    await CartModel.create()
    res.json({
        success: true,
        message: "Add to cart Api"
    });
};

const getCart = async (req, res) => {

    const cart = await CartModel.findOne({
        userId: req.user._id
    }).populate("products.productId");

    res.status(200).json({
        success: true,
        message: "List cart",
        data: cart
    })
    
};

const cartController = {
    addToCart,
    getCart
};

module.exports = cartController;
