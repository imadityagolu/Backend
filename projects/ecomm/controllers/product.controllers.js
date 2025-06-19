const ProductModel = require("../models/product.models");

const listProduct = async (req, res) => {
    const searchKey = req.query.searchKey || "";
    const pageSize = req.query.pageSize || 5;
    const pageNo = req.query.pageNo || 1;
    const itemsToSkip = ((pageNo - 1) * pageSize);

    const findQuery = {
        $or: [
            {
                title: {
                    $regex: searchKey,
                    $options: "i"
                }
            },
            {
                description: {
                    $regex: searchKey,
                    $options: "i"
                }
            }
        ]
    };

    const count = await ProductModel.find(findQuery).countDocuments();

    const product = await ProductModel.find(findQuery)
    .skip(itemsToSkip)
    .limit(pageSize)
    ;

    res.status(200).json({
        status: true,
        noOfItems: count,
        pageNo: pageNo,
        resultsList: product
    });
}

const createProduct = async (req, res) => {
    const product = await ProductModel.create(req.body);
    res.json({
        status: true,
        message: "Created successfully",
        productId: product._id 
    })
}

const productController = { 
    listProduct,
    createProduct
 };

module.exports = productController;