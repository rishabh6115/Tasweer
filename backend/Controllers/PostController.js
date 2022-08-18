const asyncHandler = require("express-async-handler");
const Post = require("../modals/postModal");
const Comment = require("../modals/commentModal");
const User = require("../modals/userModal");

const createPost = asyncHandler(async (req, res) => {
  const { heading, content, pic } = req.body;
  if (!heading || !content || !pic) {
    throw new Error("Please enter all the details");
  }
  author = req.user._id;
  const post = await Post.create({
    heading,
    content,
    pic,
    author,
  });

  if (post) {
    res.status(201).json({ message: "Post created Successfully" });
  } else {
    res.status(400);
    throw new Error("Unable to create a post");
  }
});

const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);
  if (!post) {
    throw new Error("No post found with request id");
  }

  if (!post.author.equals(req.user._id)) {
    throw new Error("Access Denied! You can only modify your own post");
  }
  try {
    await post.updateOne({ $set: req.body });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
  res.status(201).json({ message: "updation successful" });
});

const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);
  if (!post) {
    throw new Error("No post found with request id");
  }
  if (!post.author.equals(req.user._id)) {
    throw new Error("Access Denied! You can only delete your own post");
  }
  try {
    await Post.findByIdAndDelete(id);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
  res.status(201).json({ message: "deletion successful" });
});

const allPost = asyncHandler(async (req, res) => {
  let posts = await Post.find({})
    .populate("author", "-password")
    .populate("likes", "-password")
    .populate("comments");

  posts = await User.populate(posts, {
    path: "comments.author",
    select: "name email",
  });

  if (posts) {
    res.status(201).json(posts);
  } else {
    throw new Error("Fetching failed");
  }
});

const singleUserPosts = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new Error("Id is required");
  }
  console.log(req.user._id);
  console.log(userId);
  let singleUserPosts = await Post.find({
    author: { $eq: userId },
  })
    .populate("author", "-password")
    .populate("likes", "-password")
    .populate("comments");
  console.log(singleUserPosts);

  singleUserPosts = await User.populate(singleUserPosts, {
    path: "comments.author",
    select: "name email",
  });

  if (!singleUserPosts) {
    res.status(400);
    throw new Error("Posts Not found");
  }
  res.status(201).json(singleUserPosts);
});

const setLikes = asyncHandler(async (req, res) => {
  const { postId } = req.body;
  if (!postId) {
    throw new Error("Post Id must be present");
  }

  const post = await Post.findById(postId);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }
  if (post.likes.includes(req.user._id)) {
    await post.updateOne({ $pull: { likes: req.user._id } });
  } else {
    await post.updateOne({ $push: { likes: req.user._id } });
  }

  res.status(201).json({ message: "updated Likes" });
});

const addComments = asyncHandler(async (req, res) => {
  const { postId, content } = req.body;
  if (!postId || !content) {
    throw new Error("Please enter all the feilds");
  }
  author = req.user._id;

  const comment = await Comment.create({ content, author });
  if (!comment) {
    throw new Error("Unable to create comment");
  }
  const post = await Post.findByIdAndUpdate(
    postId,
    {
      $push: { comments: comment._id },
    }
    // { new: true }
  );
  // .populate("likes")
  // .populate("comments")
  // .populate("author");

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  res.status(201).json({ message: "comment added" });
});

const deleteComment = asyncHandler(async (req, res) => {
  const { postId, commentId } = req.body;

  if (!postId || !commentId) {
    throw new Error("Please enter all the fields");
  }

  const comment = await Comment.findById(commentId);
  if (!comment.author.equals(req.user._id)) {
    throw new Error("Access denied! YOu can update only your commment");
  }

  const post = await Post.findByIdAndUpdate(postId, {
    $pull: { comments: commentId },
  });
  const c = await Comment.findByIdAndDelete(commentId);

  if (!post) {
    res.status(400);
    throw new Error("Unable to delete comment");
  }

  res.status(201).json({ message: "Comment Deleted Successfully" });
});

const singlePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new Error("Post Id is requried");
  }
  const post = await Post.findById(id)
    .populate("likes")
    .populate("comments")
    .populate("author");
  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }
  res.status(201).json(post);
});

module.exports = {
  createPost,
  updatePost,
  deletePost,
  allPost,
  singleUserPosts,
  setLikes,
  addComments,
  deleteComment,
  singlePost,
};
