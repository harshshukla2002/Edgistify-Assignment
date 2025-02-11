"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const productRouter = express_1.default.Router();
productRouter.post("/addtocart", auth_middleware_1.default, (req, res) => {
    (0, product_controller_1.addToCart)(req, res);
});
productRouter.get("/cart", auth_middleware_1.default, (req, res) => {
    (0, product_controller_1.getUserCart)(req, res);
});
productRouter.post("/placeorder", auth_middleware_1.default, (req, res) => {
    (0, product_controller_1.placeOrder)(req, res);
});
productRouter.get("/order", auth_middleware_1.default, (req, res) => {
    (0, product_controller_1.getOrders)(req, res);
});
productRouter.get("/", (req, res) => {
    (0, product_controller_1.getProducts)(req, res);
});
exports.default = productRouter;
