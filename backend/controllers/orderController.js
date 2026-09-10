const Order = require("../models/Order");
const Product = require("../models/Product");


// CREATE ORDER
const createOrder = async (req, res) => {

    try {

        const {
            items,
            shippingAddress
        } = req.body;


        // Check required data

        if (!items || items.length === 0) {

            return res.status(400).json({
                message: "Order must contain at least one product"
            });

        }


        if (!shippingAddress) {

            return res.status(400).json({
                message: "Shipping address is required"
            });

        }


        let totalAmount = 0;

        const orderItems = [];


        // Check each product

        for (const item of items) {

            const product =
                await Product.findById(item.product);


            if (!product) {

                return res.status(404).json({
                    message: "Product not found"
                });

            }


            if (product.stock < item.quantity) {

                return res.status(400).json({
                    message:
                        `Not enough stock for ${product.name}`
                });

            }


            const price = product.price;

            totalAmount += price * item.quantity;


            orderItems.push({

                product: product._id,

                quantity: item.quantity,

                price: price

            });

        }


        // Create order

        const order = await Order.create({

            user: req.user.id,

            items: orderItems,

            totalAmount: totalAmount,

            shippingAddress: shippingAddress

        });


        res.status(201).json({

            message: "Order created successfully",

            order

        });

    }

    catch (error) {

        res.status(500).json({

            message: "Failed to create order",

            error: error.message

        });

    }

};

// GET MY ORDERS
const getMyOrders = async (req, res) => {

    try {

        const orders = await Order.find({
            user: req.user.id
        })
        .populate("items.product")
        .sort({ createdAt: -1 });

        res.status(200).json(orders);

    }

    catch (error) {

        res.status(500).json({
            message: "Failed to fetch orders",
            error: error.message
        });

    }

};


module.exports = {
    createOrder,
    getMyOrders
};