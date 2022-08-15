import { Box, Button, Input, Text } from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const CreateNewPost = () => {
  const formik = useFormik({
    initialValues: {
      heading: "",
      content: "",
    },
    validationSchema: Yup.object({
      heading: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Heading is required"),
      content: Yup.string()
        .min(5, "Must be more then 5 characters")
        .required("Content is required"),
      // pic: Yup.mix().required("requires"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <Box display="flex">
        <form onSubmit={formik.handleSubmit}>
          <Box
            width={{ lg: "55vw", base: "60vw" }}
            display="flex"
            flexDirection="column"
            mx="auto"
            shadow="lg"
            padding="2vw 3vw"
            paddingTop="1vw"
            rounded="lg"
            position="relative"
          >
            <Text fontSize="2xl" fontWeight="bold" color="black">
              Create New Post
            </Text>
            <Input
              marginTop="10px"
              placeholder="Heading"
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
            <Input
              marginTop="10px"
              placeholder="Content"
              type="text"
              id="content"
              name="content"
              onChange={formik.handleChange}
              value={formik.values.content}
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

            <Button
              colorScheme="purple"
              mt="10px"
              type="submit"

              // isLoading={isLoading}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default CreateNewPost;
