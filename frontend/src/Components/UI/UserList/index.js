import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const UserList = (props) => {
  const nav = useNavigate();
  return (
    <>
      <Flex
        my="1.5"
        p="2"
        bg="purple.200"
        borderRadius="10px"
        onClick={() => {
          nav(`posts/${props.name}/${props.id}`);
        }}
        cursor="pointer"
      >
        <Box>
          <Box fontWeight="700">{props.name}</Box>
          <Box color="rgb(0 0 0 /60%)" fontSize="0.8rem" mt="-4px">
            {props.email}
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default UserList;
