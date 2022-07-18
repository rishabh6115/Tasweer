const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./db");
const userRoutes = require("./Routes/userRoutes");

connectDB();
dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("api running");
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log("running on 5000");
});
