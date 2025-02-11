import React from "react";
import { Button, Card, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toaster } from "../ui/toaster";

interface ProductCardProps {
  productId: string;
  image: string;
  title: string;
  description: string;
  price: number;
}

const ProductCard = ({
  productId,
  image,
  title,
  description,
  price,
}: ProductCardProps) => {
  const { token } = useSelector((state: any) => state.authReducer);

  const addToCart = async () => {
    const body = {
      productId,
      quantity: 1,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/product/addtocart`,
        body,
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
    } catch (error: any) {
      console.error(error.response.data.message || error);
      toaster.create({
        title: error.response.data.message || "Error on add to cart",
        type: "error",
      });
    }
  };

  return (
    <Card.Root maxW="sm">
      <Image src={image} alt={title} />
      <Card.Body gap="2">
        <Card.Title>{title}</Card.Title>
        <Card.Description>{description}</Card.Description>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="1">
          ${price}
        </Text>
      </Card.Body>
      <Card.Footer gap="2">
        <Button variant="solid" onClick={addToCart}>
          Add to Cart
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default ProductCard;
