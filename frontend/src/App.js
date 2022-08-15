import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Components/Pages/HomePage";
import NavBar from "./Components/NavBar/NavBar";
import Login from "./Components/User/Login";
import Register from "./Components/User/Register";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { userActions } from "./Components/store/userSlice";
import Logout from "./Components/Logout/Logout";
import { Box, Spinner } from "@chakra-ui/react";
import CreateNewPost from "./Components/CreateNewPost";
import MyPosts from "./Components/MyPosts";

function App() {
  const appLoading = useSelector((state) => state.user.apploading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.getLoggedData());
  }, [dispatch]);

  return (
    <>
      {appLoading ? (
        <Box
          display="flex"
          minHeight="100vh"
          justifyContent="center"
          alignItems="center"
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
        <NavBar />
      )}
      <Routes>
        {!appLoading && (
          <>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/my-posts" element={<MyPosts />} />
            <Route path="/create-new-post" element={<CreateNewPost />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
