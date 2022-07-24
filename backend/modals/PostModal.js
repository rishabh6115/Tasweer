const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    heading: {
      type: String,
      trim: true,
    },

    content: {
      type: String,
      trim: true,
    },

    pic: {
      type: String,
      default:
        "https://play-lh.googleusercontent.com/JzzCdcZth2Qoiirf_j1iFXeqfpzvI_8heZZ4Ep2kJcR5vokKwe_Vquw45qoIY_lN-Ac",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
