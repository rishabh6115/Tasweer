import { Avatar, Box, Flex } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";

const CommentList = (props) => {
  console.log(props);
  const isAuth = useSelector((state) => state.user.isAuthenticated);
  const userData = useSelector((state) => state.user.loggedUser);
  const userId = isAuth ? userData._id : "";

  const bool = userId === props.id ? true : false;
  const nav = useNavigate();

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
        position="relative"
      >
        <Box
          display="flex"
          alignItems="center"
          mr="5px"
          onClick={() => {
            if (!props.show || !isAuth) {
              return;
            }
            nav(`/posts/${props.name}/${props.id}`);
          }}
          cursor={props.show && isAuth ? "pointer" : "auto"}
        >
          <Avatar name={props.name} size="sm" bg="purple.700" />
        </Box>
        <Box>
          <Box fontWeight="700">{props.name}</Box>
          <Box color="rgb(0 0 0 /60%)" fontSize="0.8rem" mt="-4px">
            {props.email}
          </Box>
          <Box>
            <Box>{props.content}</Box>
          </Box>
        </Box>
        {bool && (
          <Box
            position="absolute"
            bottom="3"
            right="5"
            fontSize="1.25rem"
            onClick={() => props.deleteComment(props.commentId)}
            cursor="pointer"
          >
            <MdDelete />
          </Box>
        )}
      </Flex>
    </>
  );
};

export default CommentList;
