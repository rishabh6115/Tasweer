const express = require("express");
const { auth } = require("../Middlewares/auth");
const router = express.Router();

const {
  createPost,
  updatePost,
  deletePost,
  allPost,
  singleUserPosts,
  setLikes,
  addComments,
  deleteComment,
} = require("../Controllers/postController");

router.route("/").post(auth, createPost).get(allPost);
router.route("/singleuserpost").get(auth, singleUserPosts);
router.route("/setlike").put(auth, setLikes);
router.route("/addcomment").put(auth, addComments);
router.route("/deletecomment").put(auth, deleteComment);
router.route("/:id").post(auth, updatePost).delete(auth, deletePost);

module.exports = router;
