import { Avatar, Box, Flex } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserList = (props) => {
  const isAuth = useSelector((state) => state.user.isAuthenticated);

  console.log(props);
  const nav = useNavigate();
  const clickHandler = () => {
    if (!props.show || !isAuth) {
      return;
    }
    nav(`/posts/${props.name}/${props.id}`);
    props.clicked();
  };
  return (
    <>
      <Flex
        my="1.5"
        p="2"
        _hover={{
          background: "purple.300",
          // color: "white",
        }}
        bg="purple.200"
        borderRadius="10px"
        onClick={clickHandler}
        cursor={props.show && isAuth ? "pointer" : "auto"}
      >
        <Box display="flex" alignItems="center" mr="5px">
          <Avatar name={props.name} size="sm" bg="purple.700" />
        </Box>
        <Box>
          <Box fontWeight="700">{props.name}</Box>
          <Box color="rgb(0 0 0 /60%)" fontSize="0.8rem" mt="-4px">
            {props.email}
          </Box>
          {props.show === "comments" && (
            <Box>
              <Box>{props.content}</Box>
            </Box>
          )}
        </Box>
      </Flex>
    </>
  );
};

export default UserList;
