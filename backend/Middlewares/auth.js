const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const User = require("../modals/userModal");
const expressAsyncHandler = require("express-async-handler");

const auth = expressAsyncHandler(async (req, res, next) => {
  const cookie = req.cookies["jwt"];
  if (!cookie) {
    throw new Error("Unauthorised");
  }
  const data = jwt.verify(cookie, process.env.SECRET);

  if (!data) {
    res.status(401);
    throw new Error("Not authorised");
  }

  const user = await User.findById(data.id).select("-password");

  if (!user) {
    throw new Error("user not found");
  }

  req.user = user;
  next();
});

module.exports = { auth };
