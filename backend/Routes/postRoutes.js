const express = require("express");
const { auth } = require("../middlewares/auth");
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
  singlePost,
} = require("../controllers/postcontroller");

router.route("/").post(auth, createPost).get(allPost);
router.route("/singleuserpost/:userId").get(auth, singleUserPosts);
router.route("/setlike").put(auth, setLikes);
router.route("/addcomment").put(auth, addComments);
router.route("/deletecomment").put(auth, deleteComment);
router
  .route("/:id")
  .post(auth, updatePost)
  .delete(auth, deletePost)
  .get(auth, singlePost);

module.exports = router;
