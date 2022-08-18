import React, { useEffect } from "react";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSlice";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);
  const isLoading = useSelector((state) => state.user.loading);
  const err = useSelector((state) => state.user.error);
  const notificationMessage = useSelector((state) => state.user.notification);

  let navigate = useNavigate();
  // const isAuth = useSelector((state) => state.user.isAuthenticated);
  const loggeduser = useSelector((state) => state.user.loggedUser);

  const clickHandler = () => {
    if (!email || !password) {
      toast({
        title: "Please Enter All the details",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    if (!email.includes("@")) {
      toast({
        title: "Please Valid Email Address",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    dispatch(userActions.login());
  };

  if (notificationMessage) {
    toast({
      title: notificationMessage,
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    dispatch(userActions.setNotification(""));
  }
  if (err) {
    toast({
      title: "User Exists or Not found",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    dispatch(userActions.setError(false));
  }
  useEffect(() => {
    if (loggeduser !== null) {
      dispatch(userActions.setIsAuthenticated(true));
      navigate("/");
    }
  }, [loggeduser, dispatch, navigate]);

  return (
    <>
      <Box minH="60vh" alignItems="center" display="flex">
        <Box
          width={{ lg: "25vw", base: "60vw" }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          margin="auto"
          shadow="lg"
          padding="2vw 3vw"
          paddingTop="1vw"
          rounded="lg"
        >
          <Text fontSize="2xl" fontWeight="bold" color="black">
            Login
          </Text>
          <Input
            marginTop="10px"
            placeholder="Enter Your Email"
            type="email"
            onChange={(e) => dispatch(userActions.setEmail(e.target.value))}
          />
          <Input
            marginTop="10px"
            placeholder="Enter Your Password"
            type="password"
            onChange={(e) => dispatch(userActions.setPassword(e.target.value))}
          />
          <Button
            colorScheme="purple"
            mt="10px"
            onClick={clickHandler}
            isLoading={isLoading}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Login;
