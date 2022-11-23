const express = require("express");
const { register, login, getuser, alluser, logout } =
  require("../Controllers/userController").default;
const { auth } = require("../Middlewares/auth");
const router = express.Router();

router.route("/").post(register).get(auth, getuser);
router.route("/login").post(login);
router.route("/all").get(auth, alluser);
router.route("/logout").get(auth, logout);

module.exports = router;
