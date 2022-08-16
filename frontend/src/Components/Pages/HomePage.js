import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import Card from "../UI/Card";

const HomePage = () => {
  const postData = useSelector((state) => state.post.allPosts);
  console.log(postData);

  return (
    <>
      <Box minHeight="92vh">
        <Text textAlign="center" fontSize="3xl" fontWeight="500" mb="2rem">
          All Blogs
        </Text>
        <Box
          width="90vw"
          margin="auto"
          gap="2rem"
          gridTemplateColumns={{
            base: "repeat(1,1fr)",
            sm: "repeat(2,1fr)",
            lg: "repeat(4,1fr)",
            md: "repeat(3,1fr)",
          }}
          display="grid"
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
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
