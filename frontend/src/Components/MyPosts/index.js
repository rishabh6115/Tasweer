import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Card from "../Card";
import { useNavigate } from "react-router-dom";

const MyPosts = () => {
  const User = useSelector((state) => state.user.loggedUser);
  const nav = useNavigate();
  const isAuth = useSelector((state) => state.user.isAuthenticated);
  console.log(User?._id);
  const [singleUserPosts, setSingleUserPosts] = useState(null);
  const [loading, setLoading] = useState(false);

  const singleUserPost = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/post/singleuserpost/${User._id}`);
      setSingleUserPosts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuth) {
      singleUserPost();
    } else {
      nav("/");
    }
  }, []);

  return (
    <div>
      <Flex width="90%" mx="auto" flexDirection="column">
        <Flex justifyContent="center" flex="1">
          <Text fontSize="4xl">My Posts</Text>
        </Flex>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="20vh"
          >
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="purple.500"
              size="xl"
            />
          </Box>
        ) : (
          <Box
            gap="2rem"
            gridTemplateColumns={{
              base: "repeat(1,1fr)",
              sm: "repeat(2,1fr)",
              lg: "repeat(4,1fr)",
              md: "repeat(3,1fr)",
            }}
            display="grid"
          >
            {singleUserPosts?.map((item) => (
              <Card
                key={item._id}
                heading={item.heading}
                pic={item.pic}
                content={item.content}
                author={item.author}
                comments={item.comments}
                likes={item.likes}
                createdAt={item.createdAt}
                id={item._id}
              />
            ))}
          </Box>
        )}
      </Flex>
    </div>
  );
};

export default MyPosts;
