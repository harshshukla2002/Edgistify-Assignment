import React, { useEffect } from "react";
import { Box, Grid, Separator, Spinner, Status, Text } from "@chakra-ui/react";

import Header from "../../components/Header";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setOrders,
  setProductError,
  setProductLoading,
} from "../../redux/product.reducer";
import axios from "axios";
import CartCard from "../../components/CartData";
import { Order as OrderProps, OrderProduct } from "./interface";

const Order = () => {
  const { orders, isLoading, isError, errorMessage } = useSelector(
    (state: any) => state.productReducer
  );
  const dispatch = useDispatch();
  const { token } = useSelector((state: any) => state.authReducer);

  const getOrder = async () => {
    dispatch(setProductLoading());
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/product/order`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setOrders(response.data.orders));
    } catch (error: any) {
      console.error(error.response.data.message || error);
      dispatch(setProductError(error.response.data.message || null));
    }
  };

  useEffect(() => {
    getOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      {!isLoading && !isError && orders && (
        <Grid padding={"10px"} width={"80%"} margin={"auto"} marginTop={"30px"}>
          {orders.map((prod: OrderProps) => {
            return (
              <Box margin={5} key={prod._id}>
                <Status.Root colorPalette="green">
                  <Status.Indicator />
                  Order Status: {prod.orderStatus}
                </Status.Root>
                <Text>Payment Status: {prod.paymentStatus}</Text>
                <Text>Price: {prod.totalPrice}</Text>
                <Box>
                  <Text>Order Details</Text>
                  <Grid
                    padding={"10px"}
                    margin={"auto"}
                    marginTop={"30px"}
                    gap={5}
                  >
                    {prod.products.map((item: OrderProduct) => {
                      return (
                        <CartCard
                          key={item._id}
                          title={item.productId.title}
                          image={item.productId.thumbnail}
                          description={item.productId.description}
                          price={item.productId.price}
                          quantity={item.quantity}
                        />
                      );
                    })}
                  </Grid>
                </Box>
                <Separator size="lg" />
              </Box>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default Order;
