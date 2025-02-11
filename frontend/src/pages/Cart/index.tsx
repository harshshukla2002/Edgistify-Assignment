import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";

import Header from "../../components/Header";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Product } from "../Home/interface";
import CartCard from "../../components/CartData";
import {
  setCartData,
  setProductError,
  setProductLoading,
} from "../../redux/product.reducer";
import axios from "axios";
import { toaster } from "../../components/ui/toaster";
import { useNavigate } from "react-router-dom";

interface CartItemProps {
  _id: string;
  userId: string;
  productId: Product;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

const Cart = () => {
  const { cartData, isLoading, isError, errorMessage } = useSelector(
    (state: any) => state.productReducer
  );
  const { token } = useSelector((state: any) => state.authReducer);
  const dispatch = useDispatch();
  let [totalPrice, setTotalPrice] = useState(0);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const getCartData = async () => {
    dispatch(setProductLoading());
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/product/cart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setCartData(response.data.products));
    } catch (error: any) {
      console.error(error.response.data.message || error);
      dispatch(setProductError(error.response.data.message || null));
    }
  };

  const placeOrder = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/product/placeorder`,
        { shippingAddress: address },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { message } = response.data;
      toaster.create({
        title: message,
        type: "success",
      });
      navigate("/place-order");
    } catch (error: any) {
      console.error(error.response.data.message || error);
      toaster.create({
        title: error.response.data.message || "Error on add to cart",
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (!cartData) {
      getCartData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cartData) {
      let sum = 0;
      for (let prod of cartData) {
        sum += prod.productId.price;
      }
      setTotalPrice(sum);
    }
  }, [cartData]);

  return (
    <Box>
      <Header />
      {isLoading && (
        <Box
          width={"10%"}
          margin={"auto"}
          marginTop={"20%"}
          textAlign={"center"}
        >
          <Spinner size="md" />
          <Text mt={"5px"}>Loading...</Text>
        </Box>
      )}
      {!isLoading && isError && (
        <Box
          margin={"auto"}
          marginTop={"20%"}
          textAlign={"center"}
          fontSize={25}
        >
          <Text>
            {errorMessage ? errorMessage : "Oopps!!!... Error Occurred"}
          </Text>
        </Box>
      )}
      {!isLoading && !isError && cartData && cartData.length > 0 && (
        <Grid padding={"10px"} width={"80%"} margin={"auto"} marginTop={"30px"}>
          {cartData.map((prod: CartItemProps) => {
            return (
              <CartCard
                key={prod._id}
                title={prod.productId.title}
                image={prod.productId.thumbnail}
                description={prod.productId.description}
                price={prod.productId.price}
                quantity={prod.quantity}
              />
            );
          })}
        </Grid>
      )}
      {!isLoading && !isError && cartData && (
        <Flex
          w={"60%"}
          alignItems={"center"}
          justifyContent={"space-between"}
          margin={"auto"}
          marginTop={"5%"}
        >
          <Text>Total Price: {totalPrice}</Text>
          <Box>
            <Input
              placeholder="enter shipping address"
              marginBottom={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Button disabled={address === ""} onClick={placeOrder}>
              Place Order
            </Button>
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default Cart;
