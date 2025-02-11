import { Request, Response } from "express";
import { CartModel, OrderModel, ProductModel } from "../models/product.model";

export const addToCart = async (req: Request | any, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const product = await ProductModel.findById(productId);
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

    let cartItem = await CartModel.findOne({ userId, productId });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await CartModel.create({ userId, productId, quantity });
    }

    res.status(201).json({ message: "Product added to cart", success: true });
  } catch (error: any) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const getUserCart = async (req: Request | any, res: Response) => {
  try {
    const userId = req.user?.id;

    const cartItems = await CartModel.find({ userId }).populate("productId");

    if (!cartItems.length) {
      return res.status(404).json({ message: "Cart is empty", success: false });
    }

    res.status(200).json({ products: cartItems, success: true });
  } catch (error) {
    console.error("Error fetching cart data:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const placeOrder = async (req: Request | any, res: Response) => {
  try {
    const userId = req.user.id;
    const { shippingAddress, paymentStatus } = req.body;

    const cartItems = await CartModel.find({ userId }).populate("productId");

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

      await ProductModel.findByIdAndUpdate(item.productId._id, {
        $inc: { stock: -item.quantity },
      });
    }

    const order = await OrderModel.create({
      userId,
      products: orderProducts,
      totalPrice,
      shippingAddress,
      paymentStatus: paymentStatus || "Pending",
    });

    await CartModel.deleteMany({ userId });
    res
      .status(200)
      .json({ message: "Order placed successfully", order, success: true });
  } catch (error: any) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const getOrders = async (req: Request | any, res: Response) => {
  try {
    const userId = req.user.id;

    const orders = await OrderModel.find({ userId }).populate(
      "products.productId"
    );

    if (!orders.length) {
      return res
        .status(404)
        .json({ message: "No orders found", success: false });
    }

    res.status(200).json({ orders, success: true });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error, success: false });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json({ products, success: true });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error, success: false });
  }
};
