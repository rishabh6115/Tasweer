import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";

const HomePage = () => {
  const isAuth = useSelector((state) => state.user.isAuthenticated);

  return (
    <>
      <Box minHeight="92vh">
        <Text textAlign="center" fontSize="3xl">
          All Blogs
        </Text>
      </Box>
    </>
  );
};

export default HomePage;
