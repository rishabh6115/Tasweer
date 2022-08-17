import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSlice";

const NavBar = () => {
  const isAuth = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const clickHandler = () => {
    dispatch(userActions.logout());
    nav("/logout");
  };

  const loggedUser = useSelector((state) => state);
  console.log(loggedUser);

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
        marginBottom="2rem"
        position="sticky"
        top="0"
      >
        <Link to="/">
          <Box textColor="purple.900" fontSize="4xl" fontWeight="extrabold">
            Vlogger
          </Box>
        </Link>
        <Box>
          {isAuth ? (
            <>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    bg="purple.600"
                    name={loggedUser.user.loggedUser.name}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      nav("/create-new-post");
                    }}
                  >
                    Create New Post
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      nav(`posts/My/${loggedUser.user.loggedUser._id}`);
                    }}
                  >
                    My Posts
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem display="flex" justifyContent="center">
                    <Button
                      colorScheme="purple"
                      variant="solid"
                      onClick={clickHandler}
                    >
                      <Text>Logout</Text>
                    </Button>
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
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
