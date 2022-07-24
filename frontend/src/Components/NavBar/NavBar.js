import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSlice";

const NavBar = () => {
  const isAuth = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const clickHandler = () => {
    dispatch(userActions.logout());
    dispatch(userActions.setLoggedUser({}));
    dispatch(userActions.setIsAuthenticated(false));
  };

  return (
    <>
      <Box
        display="flex"
        height="2rem"
        color="black"
        bg="purple.200"
        alignItems="center"
        padding="30px"
        justifyContent="space-between"
        borderBottomRadius="10px"
      >
        <Link to="/">
          <Box textColor="purple.900" fontSize="4xl" fontWeight="extrabold">
            Vlogger
          </Box>
        </Link>
        <Box>
          {isAuth ? (
            <Button
              colorScheme="purple"
              variant="solid"
              rounded="xl"
              onClick={clickHandler}
            >
              <Link to="/logout">
                <Text>Logout</Text>
              </Link>
            </Button>
          ) : (
            <Box display="flex">
              <Link to="/register">
                <Button
                  px="20px"
                  mx="10px"
                  colorScheme="purple"
                  variant="outline"
                >
                  Register
                </Button>
              </Link>
              <Link to="/login">
                <Button px="30px" colorScheme="purple">
                  Login
                </Button>
              </Link>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default NavBar;
