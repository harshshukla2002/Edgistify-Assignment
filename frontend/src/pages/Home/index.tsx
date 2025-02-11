import { Box, Grid, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import "./styles.css";
import Header from "../../components/Header";
import { useDispatch } from "react-redux";
import {
  setProductError,
  setProductLoading,
  setProducts,
} from "../../redux/product.reducer";
import { Product } from "./interface";
import ProductCard from "../../components/ProductCard";

const Home = () => {
  const { products, isLoading, isError, errorMessage } = useSelector(
    (state: any) => state.productReducer
  );
  const dispatch = useDispatch();

  const getProducts = async () => {
    dispatch(setProductLoading());
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/product/`
      );
      dispatch(setProducts(response.data.products));
    } catch (error: any) {
      console.error(error.response.data.message || error);
      dispatch(setProductError(error.response.data.message || null));
    }
  };

  useEffect(() => {
    if (!products) {
      getProducts();
    }
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
      {isError && (
        <Box
          width={"10%"}
          margin={"auto"}
          marginTop={"20%"}
          textAlign={"center"}
        >
          <Text>
            {errorMessage ? errorMessage : "Oopps!!!... Error Occurred"}
          </Text>
        </Box>
      )}
      {!isLoading && !isError && products && products.length > 0 && (
        <Grid
          templateColumns="repeat(4, 1fr)"
          padding={"10px"}
          width={"80%"}
          margin={"auto"}
          marginTop={"30px"}
          gap={"20px"}
        >
          {products.map((prod: Product) => {
            return (
              <ProductCard
                key={prod._id}
                productId={prod._id}
                title={prod.title}
                image={prod.thumbnail}
                description={prod.description}
                price={prod.price}
              />
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default Home;
