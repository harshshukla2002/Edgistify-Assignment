"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = exports.getOrders = exports.placeOrder = exports.getUserCart = exports.addToCart = void 0;
const product_model_1 = require("../models/product.model");
const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;
        const product = await product_model_1.ProductModel.findById(productId);
        if (!product) {
            return res
                .status(404)
                .json({ message: "Product not found", success: false });
        }
        if (product.stock < quantity) {
            return res
                .status(400)
                .json({ message: "Insufficient stock", success: false });
        }
        let cartItem = await product_model_1.CartModel.findOne({ userId, productId });
        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        }
        else {
            cartItem = await product_model_1.CartModel.create({ userId, productId, quantity });
        }
        res.status(201).json({ message: "Product added to cart", success: true });
    }
    catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};
exports.addToCart = addToCart;
const getUserCart = async (req, res) => {
    try {
        const userId = req.user?.id;
        const cartItems = await product_model_1.CartModel.find({ userId }).populate("productId");
        if (!cartItems.length) {
            return res
                .status(404)
                .json({ message: "Cart is empty", success: false, products: [] });
        }
        res.status(200).json({ products: cartItems, success: true });
    }
    catch (error) {
        console.error("Error fetching cart data:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};
exports.getUserCart = getUserCart;
const placeOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { shippingAddress, paymentStatus } = req.body;
        const cartItems = await product_model_1.CartModel.find({ userId }).populate("productId");
        if (!cartItems.length) {
            return res.status(400).json({ message: "Cart is empty", success: false });
        }
        let totalPrice = 0;
        const orderProducts = [];
        for (const item of cartItems) {
            if (item.productId.stock < item.quantity) {
                return res.status(400).json({
                    message: `Insufficient stock for ${item.productId.name}`,
                    success: false,
                });
            }
            totalPrice += item.productId.price * item.quantity;
            orderProducts.push({
                productId: item.productId._id,
                quantity: item.quantity,
                price: item.productId.price,
            });
            await product_model_1.ProductModel.findByIdAndUpdate(item.productId._id, {
                $inc: { stock: -item.quantity },
            });
        }
        const order = await product_model_1.OrderModel.create({
            userId,
            products: orderProducts,
            totalPrice,
            shippingAddress,
            paymentStatus: paymentStatus || "Pending",
        });
        await product_model_1.CartModel.deleteMany({ userId });
        res
            .status(200)
            .json({ message: "Order placed successfully", order, success: true });
    }
    catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};
exports.placeOrder = placeOrder;
const getOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await product_model_1.OrderModel.find({ userId }).populate("products.productId");
        if (!orders.length) {
            return res
                .status(404)
                .json({ message: "No orders found", success: false, orders: [] });
        }
        res.status(200).json({ orders, success: true });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error, success: false });
    }
};
exports.getOrders = getOrders;
const getProducts = async (req, res) => {
    try {
        const products = await product_model_1.ProductModel.find();
        res.status(200).json({ products, success: true });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error, success: false });
    }
};
exports.getProducts = getProducts;
