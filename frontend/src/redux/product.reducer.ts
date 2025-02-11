import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  _id: string;
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  brand: string;
  thumbnail: string;
  image: string[];
}

interface Cart {
  _id: string;
  userId: string;
  productId: Product;
  quantity: Number;
  createdAt: string;
  updatedAt: string;
}

interface OrderProduct {
  productId: Product;
  quantity: number;
  price: number;
  _id: string;
}

interface Order {
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

interface State {
  isLoading: boolean;
  isError: boolean;
  products: Product[] | null;
  cartData: Cart[] | null;
  orders: Order[] | null;
  errorMessage: string | null;
}

const initialState: State = {
  products: null,
  isLoading: false,
  isError: false,
  cartData: null,
  orders: null,
  errorMessage: null,
};

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    setProductLoading: (state) => {
      state.isLoading = true;
    },
    setProductError: (state, action: PayloadAction<string | null>) => {
      state.isError = true;
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[] | null>) => {
      state.isError = false;
      state.isLoading = false;
      state.products = action.payload;
    },
    setCartData: (state, action: PayloadAction<Cart[] | null>) => {
      state.isError = false;
      state.isLoading = false;
      state.cartData = action.payload;
    },
    setOrders: (state, action: PayloadAction<Order[] | null>) => {
      state.isError = false;
      state.isLoading = false;
      state.orders = action.payload;
    },
  },
});

export const {
  setProductLoading,
  setProductError,
  setProducts,
  setCartData,
  setOrders,
} = productSlice.actions;
export default productSlice.reducer;
