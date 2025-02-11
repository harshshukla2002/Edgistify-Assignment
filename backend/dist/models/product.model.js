"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = exports.CartModel = exports.ProductModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: { type: [String], required: true },
});
exports.ProductModel = mongoose_1.default.models.Product || mongoose_1.default.model("product", productSchema);
const cartSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    productId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "product",
        required: true,
    },
    quantity: { type: Number, required: true, default: 1 },
}, { timestamps: true });
exports.CartModel = mongoose_1.default.models.cart || mongoose_1.default.model("cart", cartSchema);
const orderSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "product",
                required: true,
            },
            name: String,
            quantity: Number,
            price: Number,
        },
    ],
    totalPrice: { type: Number, required: true },
    shippingAddress: { type: String, required: true },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending",
    },
    orderStatus: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered"],
        default: "Pending",
    },
}, { timestamps: true });
exports.OrderModel = mongoose_1.default.models.order || mongoose_1.default.model("order", orderSchema);
