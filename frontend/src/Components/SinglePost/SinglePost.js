import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPosts } from "../store/postSlice";
import { userActions } from "../store/userSlice";
import CardTwo from "../UI/Card/CardTwo";

const SinglePost = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const nav = useNavigate();
  const post = useSelector((state) => state.post);
  const postReq = useSelector((state) => state.post.postRequestLoading);
  const isAuth = useSelector((state) => state.user.isAuthenticated);
  console.log(post);

  const singlePost = isAuth
    ? post.allPosts?.find((item) => item._id === id)
    : "";

  //   console.log(singlePost);

  return (
    <>
      {isAuth && (
        <Box
          width={{ base: "90vw", lg: "30vw", sm: "40vw" }}
          margin="auto"
          my="2rem"
        >
          <CardTwo
            key={singlePost._id}
            heading={singlePost.heading}
            pic={singlePost.pic}
            content={singlePost.content}
            author={singlePost.author}
            comments={singlePost.comments}
            likes={singlePost.likes}
            createdAt={singlePost.createdAt}
            id={singlePost._id}
          />
        </Box>
      )}
    </>
  );
};

export default SinglePost;
