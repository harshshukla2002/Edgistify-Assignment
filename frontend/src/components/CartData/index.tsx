import React from "react";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

interface CartCardProps {
  image: string;
  title: string;
  description: string;
  price: Number;
  quantity: number;
}

const CartCard = ({
  image,
  title,
  description,
  price,
  quantity,
}: CartCardProps) => {
  return (
    <Flex alignItems={"center"} justifyContent={"space-between"}>
      <Image src={image} alt={title} w={"15%"} />
      <Box w={"60%"}>
        <Heading size={"md"}>{title}</Heading>
        <Text marginBlock={2} fontSize={"14px"}>
          {description}
        </Text>
        <Text fontSize={"14px"}>Quantity: {quantity}</Text>
      </Box>
      <Text fontSize={"18px"}>${price.toString()}</Text>
    </Flex>
  );
};

export default CartCard;
