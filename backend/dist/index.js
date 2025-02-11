"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const db_1 = require("./config/db");
const user_route_1 = __importDefault(require("./routes/user.route"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/user", user_route_1.default);
app.use("/api/product", product_route_1.default);
app.get("/", (req, res) => {
    res.status(200).json({ message: "server is running", success: true });
});
app.listen(process.env.PORT, async () => {
    await (0, db_1.connectDb)();
    console.log(`server is running on http://localhost:4001/`);
});
