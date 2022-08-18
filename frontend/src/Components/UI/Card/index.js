/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Heart from "react-heart";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import UserList from "../UserList";
import CommentList from "../UserList/CommentList";
import { getPosts, setPostRequestLoading } from "../../store/postSlice";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ReactCardFlip from "react-card-flip";
import { TiArrowBack } from "react-icons/ti";
import { AiFillDelete } from "react-icons/ai";

const Card = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  const toast = useToast();
  const [active, setActive] = useState(null);
  const { id } = props;
  const { likes } = props;
  const [updatedLikes, setUpdatedLikes] = useState([...likes]);
  const isAuth = useSelector((state) => state.user.isAuthenticated);
  const userData = useSelector((state) => state.user.loggedUser);
  const postReq = useSelector((state) => state.post.postRequestLoading);
  const userId = isAuth ? userData._id : "";
  const user = useSelector((state) => state.user.loggedUser);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");
  const [modalShow, setModalShow] = useState(null);
  const [comment, setComment] = useState("");
  const btnRef = React.useRef(null);
  const nav = useNavigate();
  const isAuthor = userId === props.author._id;
  useEffect(() => {
    setActive(() => {
      return updatedLikes.some((item) => item._id === userId);
    });
  }, [updatedLikes, userId]);

  const clickHandler = async () => {
    if (active) {
      setUpdatedLikes((prev) => prev.filter((item) => item._id !== userId));
    } else {
      setUpdatedLikes((prev) => [...prev, user]);
    }
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
      dispatch(getPosts());
    } catch (error) {
      console.log(error);
    }
  };

  const AddComment = async () => {
    if (!comment) {
      toast({
        title: "Please enter comment",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    try {
      dispatch(setPostRequestLoading(true));
      const body = {
        postId: id,
        content: comment,
      };
      const { data } = await axios.put("/api/post/addcomment", body);
      dispatch(getPosts());
    } catch (error) {
      dispatch(setPostRequestLoading(false));
      console.log(error);
    }
  };

  const deleteComment = async (CommentId) => {
    try {
      dispatch(setPostRequestLoading(true));
      const body = {
        postId: id,
        commentId: CommentId,
      };
      const { data } = await axios.put("/api/post/deletecomment", body);
      dispatch(getPosts());
      console.log(data);
    } catch (error) {
      dispatch(setPostRequestLoading(false));
      console.log(error);
    }
  };

  const deletePost = async () => {
    try {
      dispatch(setPostRequestLoading(true));
      const { data } = await axios.delete(`/api/post/${id}`);
      dispatch(getPosts());
      console.log(data);
    } catch (error) {
      dispatch(setPostRequestLoading(false));
      console.log(error);
    }
  };

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(10deg)"
    />
  );

  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const [click, setClick] = useState(false);

  return (
    <>
      <ReactCardFlip
        className="flip-card"
        isFlipped={click}
        flipDirection="horizontal"
      >
        <Box
          display="flex"
          flexDirection="column"
          shadow="lg"
          rounded="lg"
          height="fit-content"
          position="relative"
        >
          {isAuthor && (
            <Box
              position="absolute"
              bottom="25px"
              left="25px"
              onClick={() => {
                setClick(!click);
              }}
              fontSize="1.5rem"
              cursor="pointer"
            >
              <AiFillDelete style={{ fill: "#ef233c" }} />
            </Box>
          )}
          <Image
            src={props.pic}
            alt={props.heading}
            rounded="2xl"
            borderBottomRadius="0"
            cursor={isAuth ? "pointer" : " auto"}
            onClick={() => {
              if (!isAuth) return;
              nav(`/single-post/${id}`);
            }}
            height="350px"
          ></Image>
          <Box
            padding="0 1rem"
            display="flex"
            flexDirection="column"
            gap="0.5rem"
            justifyContent="space-between"
          >
            <Text fontSize="xl" mt="0.5rem" fontWeight="500">
              {props.heading}
            </Text>
            <Text>
              {props.content.length > 58
                ? props.content?.slice(0, 58)
                : props.content}
              <Text
                display="inline"
                cursor="pointer"
                onClick={() => {
                  if (!isAuth) return;
                  nav(`/single-post/${id}`);
                }}
              >
                {props.content.length > 58 && "..."}
              </Text>
            </Text>
            <Box
              justifyContent="space-between"
              display="flex"
              alignItems="center"
            >
              <Box fontSize={!isAuth ? "xl" : ""}>
                {isAuth && (
                  <Heart
                    isActive={active}
                    onClick={clickHandler}
                    style={{ width: "33px", margin: "auto" }}
                  />
                )}
                <Text fontWeight="500" display="inline-block" mr="5px">
                  {updatedLikes.length}
                </Text>
                <Text
                  display="inline-block"
                  mr="5px"
                  ref={btnRef}
                  onClick={() => {
                    setModalShow("Likes");
                    setOverlay(<OverlayOne />);
                    onOpen();
                  }}
                  cursor="pointer"
                >
                  {updatedLikes.length > 1 ? "Likes" : "Like"}
                </Text>
              </Box>
              <Box fontSize="xl">
                <Text fontWeight="500" display="inline-block" mr="5px">
                  {props.comments.length}
                </Text>
                <Box
                  ref={btnRef}
                  onClick={() => {
                    setModalShow("Comments");
                    setOverlay(<OverlayOne />);
                    onOpen();
                  }}
                  cursor="pointer"
                  display="inline-block"
                  mr="5px"
                >
                  {props.comments.length > 1 ? "Comments" : "Comment"}
                </Box>
              </Box>
            </Box>
            <Box
              display="flex"
              alignItems="flex-end"
              flexDirection="column"
              mb="1rem"
            >
              <Text> {moment(props.createdAt).fromNow()}</Text>
              <Text fontSize="0.8rem"> ~ {props.author.name}</Text>
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          shadow="lg"
          rounded="lg"
          height="550px"
          justifyContent="center"
          alignItems="center"
          position="relative"
        >
          <Box
            position="absolute"
            top="2"
            left="2"
            fontSize="2.5rem"
            onClick={() => {
              setClick(!click);
            }}
            cursor="pointer"
          >
            <TiArrowBack />
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Text fontSize="3xl" fontWeight="700" mt="2">
              <span style={{ color: "red" }}> Confirm</span> to delete
            </Text>
            <Button colorScheme="red" onClick={deletePost} isLoading={postReq}>
              Delete
            </Button>
          </Box>
        </Box>
      </ReactCardFlip>

      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior={scrollBehavior}
      >
        {overlay}
        <ModalContent>
          <ModalHeader>{modalShow}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {modalShow === "Likes" &&
              updatedLikes.map((item) => (
                <UserList
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  email={item.email}
                  show={props.show}
                />
              ))}
            {modalShow === "Comments" &&
              props.comments.map((item) => (
                <CommentList
                  key={item._id}
                  id={item.author._id}
                  name={item.author.name}
                  content={item.content}
                  deleteComment={deleteComment}
                  commentId={item._id}
                  postReq={postReq}
                  show={props.show}
                />
              ))}

            {modalShow === "Comments" && isAuth && (
              <Box pt="10px">
                {!postReq && (
                  <Input
                    type="text"
                    placeholder="Add new comment"
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  ></Input>
                )}

                <Button
                  colorScheme="purple"
                  mt="5px"
                  width="100%"
                  onClick={AddComment}
                  isLoading={postReq}
                >
                  Add
                </Button>
              </Box>
            )}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Card;
