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

function App() {
  const isAuth = useSelector((state) => state.user.isAuthenticated);

  const dispatch = useDispatch();
  const loggeduser = useSelector((state) => state.user.loggedUser);
  if (loggeduser.name) {
    dispatch(userActions.setIsAuthenticated(true));
  }

  useEffect(() => {
    dispatch(userActions.getLoggedData());
  }, [dispatch]);
  console.log(isAuth);
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;
