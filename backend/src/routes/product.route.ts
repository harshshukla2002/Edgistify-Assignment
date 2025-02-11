import express, { Request, Response } from "express";
import {
  addToCart,
  getOrders,
  getProducts,
  getUserCart,
  placeOrder,
} from "../controllers/product.controller";
import protect from "../middleware/auth.middleware";

const productRouter = express.Router();

productRouter.post("/addtocart", protect, (req: Request, res: Response) => {
  addToCart(req, res);
});
productRouter.get("/cart", protect, (req: Request, res: Response) => {
  getUserCart(req, res);
});
productRouter.post("/placeorder", protect, (req: Request, res: Response) => {
  placeOrder(req, res);
});
productRouter.get("/order", protect, (req: Request, res: Response) => {
  getOrders(req, res);
});
productRouter.get("/", protect, (req: Request, res: Response) => {
  getProducts(req, res);
});

export default productRouter;
