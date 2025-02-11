import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth.reducer";
import productReducer from "../redux/product.reducer";

export const store = configureStore({
  reducer: {
    authReducer,
    productReducer,
  },
});
