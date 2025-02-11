import React from "react";
import { Box, Image, Link, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";

const PlaceOrder = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Header />
      <Box w={"25%"} margin={"auto"} mt={"5%"} textAlign={"center"}>
        <Image
          src="https://cdn.dribbble.com/users/2185205/screenshots/7886140/media/90211520c82920dcaf6aea7604aeb029.gif"
          w={"90%"}
        />
        <Text fontSize={"25px"} marginTop={"30px"} textTransform={"uppercase"}>
          Order Successful
        </Text>
        <Text>Will delivered in 3 4 days</Text>
        <Link onClick={() => navigate("/")}>Home</Link>
      </Box>
    </Box>
  );
};

export default PlaceOrder;
