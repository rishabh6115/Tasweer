const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./db");
const userroutes = require("./routes/userroutes");
const postroutes = require("./routes/postroutes");
const path = require("path");

connectDB();
dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/api/user", userroutes);
app.use("/api/post", postroutes);

const __dirname1 = path.resolve();

app.get("/", (req, res) => {
  res.send("API is running..");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`running on ${port}`);
});
