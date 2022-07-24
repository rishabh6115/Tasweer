const express = require("express");
const {
  register,
  login,
  getuser,
  alluser,
  logout,
  alluser2,
} = require("../Controllers/UserController");
const { auth } = require("../Middlewares/auth");
const router = express.Router();

router.route("/").post(register).get(auth, getuser);
router.route("/login").post(login);
router.route("/all").get(auth, alluser);
router.route("/logout").get(auth, logout);
router.route("/alluser").get(alluser2);

module.exports = router;
