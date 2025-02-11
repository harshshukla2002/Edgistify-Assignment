import { Product } from "../Home/interface";

export interface OrderProduct {
  productId: Product;
  quantity: number;
  price: number;
  _id: string;
}

export interface Order {
  _id: string;
  userId: string;
  products: OrderProduct[];
  totalPrice: number;
  shippingAddress: string;
  paymentStatus: "Pending" | "Completed" | "Failed";
  orderStatus: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: string;
  updatedAt: string;
}
