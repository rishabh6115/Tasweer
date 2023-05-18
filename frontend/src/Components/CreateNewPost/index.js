import { Box, Button, Input, Text, Textarea, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { userActions } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../store/postSlice";

const CreateNewPost = () => {
  const toast = useToast();
  const [pic, setPic] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const formik = useFormik({
    initialValues: {
      heading: "",
      content: "",
    },
    validationSchema: Yup.object({
      heading: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Heading is required")
        .min(3, "Must be more then 3 characters"),
      content: Yup.string().required("Content is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const body = {
          ...values,
          pic,
        };
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            accept: "application/json",
            "content-type": "application/json",
          },
        };
        await axios.post(
          `${process.env.REACT_APP_BACKEND}/api/post`,
          body,
          config
        );
        toast({
          title: "Post created successfully",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        setLoading(false);
        dispatch(getPosts());
        nav("/");
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast({
          title: error.message,
          status: "false",
          duration: 4000,
          isClosable: true,
        });
      }
    },
  });

  const changeHandler = async (pic) => {
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      setLoading(true);
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "ddfcndmo7");
      fetch("https://api.cloudinary.com/v1_1/ddfcndmo7/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      toast({
        title: "Please input a image",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Box display="flex">
        <Box
          width={{ lg: "55%", base: "90%", sm: "80%" }}
          display="flex"
          flexDirection="column"
          mx="auto"
          shadow="lg"
          padding="2vw 3vw"
          paddingTop="1vw"
          rounded="lg"
          position="relative"
          mt={{ base: "150px", lg: "1" }}
        >
          <form onSubmit={formik.handleSubmit} style={{}}>
            <Text fontSize="2xl" fontWeight="bold" color="black">
              Create New Post
            </Text>
            <Input
              marginTop="10px"
              placeholder="Title"
              type="text"
              id="heading"
              name="heading"
              onChange={formik.handleChange}
              value={formik.values.heading}
            />
            {formik.touched.heading && formik.errors.heading ? (
              <div
                style={{
                  color: "red",
                  fontWeight: "400",
                  paddingLeft: "0.5rem",
                }}
              >
                {formik.errors.heading}
              </div>
            ) : null}
            <Textarea
              marginTop="10px"
              placeholder="Caption"
              type="text"
              id="content"
              name="content"
              borderRadius="5px"
              onChange={formik.handleChange}
              value={formik.values.content}
              minHeight="200px"
            />
            {formik.touched.content && formik.errors.content ? (
              <div
                style={{
                  color: "red",
                  fontWeight: "400",
                  paddingLeft: "0.5rem",
                }}
              >
                {formik.errors.content}
              </div>
            ) : null}

            <Input
              marginTop="10px"
              pt="5px"
              pb="5px"
              id="pic"
              name="pic"
              type="file"
              required
              onChange={(e) => changeHandler(e.target.files[0])}
            />

            <Button
              colorScheme="purple"
              mt="10px"
              type="submit"
              width="100%"
              isLoading={loading}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default CreateNewPost;
