const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./db");
const userRoutes = require("./Routes/userRoutes");
const postRoutes = require("./Routes/postRoutes");

connectDB();
dotenv.config();

app.use(cookieParser());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

app.get("/", (req, res) => {
  res.send("api running");
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log("running on 5000");
});
