import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import Card from "../UI/Card";

const HomePage = () => {
  const postData = useSelector((state) => state.post.allPosts);

  return (
    <>
      <Box>
        <Text textAlign="center" fontSize="3xl" fontWeight="500" mb="2rem">
          All Posts
        </Text>
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
          my="2rem"
        >
          {postData?.map((item) => (
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
              show={true}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
