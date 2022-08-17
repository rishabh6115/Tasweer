import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import "./logout.css";

const Logout = () => {
  return (
    <Box minH="60vh" display="flex" justifyContent="center" alignItems="center">
      <Box display="flex" flexDirection="column">
        <Text fontSize="4xl" textAlign="center">
          You Have Been Successfully Logged Out
        </Text>
        <Box display="flex" justifyContent="center">
          <Link to="/" className="logout_login">
            <Button
              colorScheme="purple"
              maxW="fit-content"
              mx="auto"
              mt="10px"
              mr="20px"
              flexBasis="50%"
            >
              HomePage
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Logout;
