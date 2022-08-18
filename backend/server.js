const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./db");
const userRoutes = require("./Routes/userRoutes");
const postRoutes = require("./Routes/postRoutes");
const path = require("path");

connectDB();
dotenv.config();

app.use(cookieParser());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  console.log(process.env.NODE_ENV);
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`running on ${port}`);
});
