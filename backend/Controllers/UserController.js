const User = require("../modals/UserModal");
const asyncHandler = require("express-async-handler");
const generateToken = require("../generateToken");

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new Error("Please Enter All the feilds");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User Already Exists");
  }

  const user = await User.create({ name, email, password });

  if (user) {
    const token = generateToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, //1 Day
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token,
    });
  } else {
    res.status("400");
    throw new Error("Failed to create user");
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Please enter all the feilds");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  if (await user.matchPassword(password)) {
    const token = generateToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token,
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

const getuser = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new error("Unauthorized");
  }

  res.send(req.user);
});

const alluser = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.json(users);
});

const logout = asyncHandler(async (req, res) => {
  if (req.user) {
    res.clearCookie("jwt");
    res.json({ message: "Log Out Successfull" });
  } else throw new Error("Something went wrong");
});

module.exports = { register, login, getuser, alluser, logout };
