import React from "react";
import { Routes, Route } from "react-router";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Cart from "../pages/Cart";
import Order from "../pages/Order";
import PlaceOrder from "../pages/PlaceOrder";
import NotFound from "../components/NotFound";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order" element={<Order />} />
      <Route path="/place-order" element={<PlaceOrder />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
