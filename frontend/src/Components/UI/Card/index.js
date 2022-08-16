import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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

const Card = (props) => {
  const [active, setActive] = useState(null);
  const { id } = props;
  const { likes } = props;
  const [updatedLikes, setUpdatedLikes] = useState([...likes]);
  const isAuth = useSelector((state) => state.user.isAuthenticated);

  const userData = useSelector((state) => state.user.loggedUser);

  const userId = isAuth ? userData._id : "";
  const user = useSelector((state) => state.user.loggedUser);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");

  const btnRef = React.useRef(null);

  useEffect(() => {
    setActive(() => {
      return updatedLikes.some((item) => item._id === userId);
    });
  }, []);
  console.log(updatedLikes);
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
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(10deg)"
      // backdropInvert="80%"
    />
  );

  const [overlay, setOverlay] = React.useState(<OverlayOne />);

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
          <Text>{props.content?.slice(0, 40)}...</Text>
          <Box
            justifyContent="space-between"
            display="flex"
            alignItems="center"
          >
            <Box>
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
              {props.comments.length > 1 ? "Comments" : "Comment"}
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
      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior={scrollBehavior}
      >
        {overlay}
        <ModalContent>
          <ModalHeader>Likes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {updatedLikes.map((item) => (
              <UserList
                key={item._id}
                id={item._id}
                name={item.name}
                email={item.email}
              />
            ))}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Card;
