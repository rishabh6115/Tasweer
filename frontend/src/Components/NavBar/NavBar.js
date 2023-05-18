import React, { useState } from "react";
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
  Tooltip,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Input,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSlice";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import UserList from "../UI/UserList";
const NavBar = () => {
  const isAuth = useSelector((state) => state.user.isAuthenticated);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const clickHandler = () => {
    dispatch(userActions.logout());
    nav("/logout");
  };

  const loggedUser = useSelector((state) => state);
  const changeHandler = async (e) => {
    const val = e.target.value;
    if (!val) {
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}/api/user/all?search=${val}`,
        config
      );
      setData(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2} mb="2">
              <Input
                placeholder="Search by name or email"
                mr={2}
                onChange={changeHandler}
              />
            </Box>
            <Box>
              {loading ? (
                <Stack>
                  <Skeleton height="40px" />
                  <Skeleton height="40px" />
                  <Skeleton height="40px" />
                  <Skeleton height="40px" />
                  <Skeleton height="40px" />
                  <Skeleton height="40px" />
                  <Skeleton height="40px" />
                  <Skeleton height="40px" />
                  <Skeleton height="40px" />
                  <Skeleton height="40px" />
                  <Skeleton height="40px" />
                  <Skeleton height="40px" />
                  <Skeleton height="40px" />
                </Stack>
              ) : (
                data.map((item) => (
                  <UserList
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    email={item.email}
                    show={true}
                    clicked={onClose}
                  />
                ))
              )}
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
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
        zIndex="1"
      >
        {isAuth && (
          <Button onClick={onOpen} colorScheme="purple">
            <FaSearch />
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        )}
        <Link to="/">
          {!isAuth && (
            <Tooltip label="Homepage" hasArrow placement="bottom-end">
              <Box
                textColor="purple.900"
                fontSize={{ base: "2xl", sm: "4xl" }}
                fontWeight="extrabold"
              >
                Tasweer
              </Box>
            </Tooltip>
          )}
          {isAuth && (
            <Tooltip label="Homepage" hasArrow placement="bottom-end">
              <Box
                textColor="purple.900"
                fontSize={{ base: "2xl", sm: "4xl" }}
                fontWeight="extrabold"
                transform={{ base: "translateX(0px)", md: "translateX(-50px)" }}
              >
                Tasweer
              </Box>
            </Tooltip>
          )}
        </Link>
        <Box>
          {isAuth ? (
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
          ) : (
            <Box display="flex">
              <Link to="/register">
                <Button
                  width={{ base: "20vw", md: "8vw" }}
                  mx="10px"
                  colorScheme="purple"
                  variant="outline"
                >
                  Register
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  width={{ base: "20vw", md: "8vw" }}
                  colorScheme="purple"
                >
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
