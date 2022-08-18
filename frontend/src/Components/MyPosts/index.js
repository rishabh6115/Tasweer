import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from "../UI/Card";
import { useParams } from "react-router-dom";

const MyPosts = () => {
  const isAuth = useSelector((state) => state.user.isAuthenticated);
  const post = useSelector((state) => state.post);
  const { id } = useParams();
  const { name } = useParams();
  console.log(id);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  const singleUserPosts = isAuth
    ? post.allPosts.filter((item) => item.author._id === id)
    : "";
  console.log(singleUserPosts);

  return (
    <div>
      <Flex width="90%" mx="auto" flexDirection="column">
        {!loading && singleUserPosts?.length > 0 && (
          <Flex justifyContent="center" flex="1">
            <Text fontSize="4xl">{name} Posts</Text>
          </Flex>
        )}
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
        ) : singleUserPosts?.length > 0 ? (
          <Box
            width={{ sm: "40vw", lg: "60vw", base: "90vw" }}
            margin="auto"
            gap="2rem"
            gridTemplateColumns={{
              base: "repeat(1,1fr)",
              sm: "repeat(1,1fr)",
              lg: "repeat(2,1fr)",
            }}
            display="grid"
            justifyContent="center"
            my="4"
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
                show={false}
              />
            ))}
          </Box>
        ) : (
          <Box
            minHeight="50vh"
            justifyContent="center"
            alignItems="center"
            display="flex"
            fontSize={{ base: "4xl", md: "8xl" }}
            fontWeight="600"
          >
            No Post Found
          </Box>
        )}
      </Flex>
    </div>
  );
};

export default MyPosts;
