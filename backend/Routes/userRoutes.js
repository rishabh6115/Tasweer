const express = require("express");
const {
  register,
  login,
  getuser,
  alluser,
  logout,
} = require("../controllers/usercontroller");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.route("/").post(register).get(auth, getuser);
router.route("/login").post(login);
router.route("/all").get(auth, alluser);
router.route("/logout").get(auth, logout);

module.exports = router;
