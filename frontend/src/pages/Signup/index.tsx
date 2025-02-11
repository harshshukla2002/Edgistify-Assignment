import React, { useState } from "react";
import { Box, Button, Card, Input, Stack } from "@chakra-ui/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./styles.css";
import { InputGroup } from "../../components/ui/input-group";
import { Field } from "../../components/ui/field";
import { useDispatch } from "react-redux";
import {
  setAuthError,
  setAuthLoading,
  setAuthToken,
  setAuthUser,
} from "../../redux/auth.reducer";
import { toaster } from "../../components/ui/toaster";
import { useSelector } from "react-redux";

const intialState = {
  name: "",
  email: "",
  password: "",
};

const Signup = () => {
  const { isLoading } = useSelector((state: any) => state.authReducer);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const [form, setForm] = useState(intialState);
  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async () => {
    dispatch(setAuthLoading());
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/register`,
        form
      );
      const { user, token, message } = response.data;
      toaster.create({
        title: message,
        type: "success",
      });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setAuthUser(user));
      dispatch(setAuthToken(token));
      setTimeout(() => {
        navigate("/");
      }, 2000);
      setForm(intialState);
    } catch (error: any) {
      console.error(error.response.data.message || error);
      toaster.create({
        title: error.response.data.message || "Error on signup",
        type: "error",
      });
      dispatch(setAuthError());
    }
  };

  return (
    <Box
      width={"35%"}
      margin={"auto"}
      marginTop={"6%"}
      className="form-container"
    >
      <Card.Root maxW="md">
        <Card.Header>
          <Card.Title>Sign up</Card.Title>
          <Card.Description>
            Fill in the form below to create an account
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <Stack gap="4" w="full">
            <Field label="Name">
              <Input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </Field>
            <Field label="Email">
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </Field>
            <Field label="Password">
              <InputGroup
                endElement={
                  showPassword ? (
                    <div onClick={() => setShowPassword((prev) => !prev)}>
                      <FaRegEyeSlash />
                    </div>
                  ) : (
                    <div onClick={() => setShowPassword((prev) => !prev)}>
                      <FaRegEye />
                    </div>
                  )
                }
                cursor={"pointer"}
              >
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />
              </InputGroup>
            </Field>
          </Stack>
        </Card.Body>
        <Card.Footer width={"100%"}>
          <Button
            width={"100%"}
            variant="solid"
            onClick={handleSignup}
            disabled={isLoading}
          >
            {isLoading ? "Loading...." : " Sign in"}
          </Button>
        </Card.Footer>
        <Card.Description textAlign={"center"} marginBottom={"20px"}>
          already have a account ?{" "}
          <span className="link-text" onClick={() => navigate("/login")}>
            login
          </span>
        </Card.Description>
      </Card.Root>
    </Box>
  );
};

export default Signup;
