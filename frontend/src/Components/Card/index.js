import { Box, Image, Text } from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Heart from "react-heart";
import axios from "axios";

const Card = (props) => {
  const [active, setActive] = useState(null);
  const { id } = props;
  const { likes } = props;
  console.log(props);
  const userId = useSelector((state) => state.user.loggedUser._id);
  useEffect(() => {
    console.log(likes);
    console.log(userId);
    setActive(() => {
      return likes.some((item) => item._id === userId);
    });
  }, []);
  console.log(active);
  const clickHandler = async () => {
    if (active) {
      props.likes.filter((item) => item._id !== userId);
    } else {
    }
    console.log(likes);
    setActive(!active);
    try {
      const config = {
        headers: {
          "content-type": `application/json`,
        },
      };
      const body = {
        postId: id,
      };

      const { data } = await axios.put("/api/post/setlike", body, config);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Box display="flex" flexDirection="column" shadow="lg" rounded="lg">
        <Image
          src={props.pic}
          alt={props.heading}
          rounded="2xl"
          borderBottomRadius="0"
        ></Image>
        <Box
          padding="0 1rem"
          display="flex"
          flexDirection="column"
          gap="0.5rem"
        >
          <Text fontSize="xl" mt="0.5rem" fontWeight="500">
            {props.heading}
          </Text>
          <Text>{props.content}</Text>
          <Box justifyContent="space-between" display="flex">
            <Box>
              <Text fontWeight="500" display="inline-block" mr="5px">
                {props.comments.length}
              </Text>
              {props.comments.length > 1 ? "Comments" : "Comment"}
            </Box>
            <Box>
              <Heart isActive={active} onClick={clickHandler} />
              <Text fontWeight="500" display="inline-block" mr="5px">
                {props.likes.length}
              </Text>
              {props.likes.length > 1 ? "Likes" : "Like"}
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="flex-end"
            flexDirection="column"
            mb="1rem"
          >
            <Text> {moment(props.createdAt).fromNow()}</Text>
            <Text fontSize="0.8rem"> - {props.author.name}</Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Card;
