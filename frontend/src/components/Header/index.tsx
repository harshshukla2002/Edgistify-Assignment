import React from "react";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import "./styles.css";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../../components/ui/menu";
import { useDispatch } from "react-redux";
import { setAuthToken, setAuthUser } from "../../redux/auth.reducer";
import { toaster } from "../ui/toaster";

const Header = () => {
  const { user, token } = useSelector((state: any) => state.authReducer);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setAuthUser(null));
    dispatch(setAuthToken(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const handleNavigation = (value: string) => {
    if (token) {
      navigate(`/${value}`);
      return;
    }

    toaster.create({
      title: "Not Authorised, Please login first",
      type: "error",
    });
  };

  return (
    <Flex padding={5} justifyContent={"space-between"}>
      <Heading fontSize={30}>Edgistify</Heading>
      <Flex gap={10}>
        <Text
          className={`header-text ${location.pathname === "/" ? "active" : ""}`}
          onClick={() => navigate("/")}
        >
          Home
        </Text>
        <Text
          className={`header-text ${
            location.pathname === "/cart" ? "active" : ""
          }`}
          onClick={() => handleNavigation("cart")}
        >
          Cart
        </Text>
        <Text
          className={`header-text ${
            location.pathname === "/order" ? "active" : ""
          }`}
          onClick={() => handleNavigation("order")}
        >
          Orders
        </Text>
      </Flex>
      <Box>
        {user ? (
          <MenuRoot>
            <MenuTrigger asChild>
              <Button variant="outline" size="sm">
                {user?.name.split(" ")[0]}
              </Button>
            </MenuTrigger>
            <MenuContent>
              <MenuItem value="logout" onClick={handleLogout}>
                Logout
              </MenuItem>
            </MenuContent>
          </MenuRoot>
        ) : (
          <Button onClick={() => navigate("/login")}>Login</Button>
        )}
      </Box>
    </Flex>
  );
};

export default Header;
