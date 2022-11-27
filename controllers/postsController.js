const Post = require("../models/post.model");
const asyncHandler = require("express-async-handler");

const getPosts = asyncHandler(async (req, res) => {
  try {
    const profilePosts = await Post.find({ post_origin: req.params.uid });
    res.json(profilePosts);
  } catch (error) {
    throw new Error("err: ", error);
  }
});

const getPost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findOne({ post_origin: req.params.pid });
    res.json(post);
  } catch (error) {
    throw new Error("err: ", error);
  }
});

const addPost = asyncHandler(async (req, res) => {
  const postOrigin = req.body.post_origin;
  const postId = req.body.id;
  try {
    const post = await Post.create(req.body);

    res.json(post);
  } catch (error) {
    throw new Error("err: ", error);
  }
});

const deletePost = asyncHandler(async (req, res) => {
  try {
    const id = req.params.pid;
    const post = await Post.deleteOne({ _id: id });

    res.status(post);
  } catch (error) {
    throw new Error("err: ", error);
  }
});

module.exports = {
  getPost,
  getPosts,
  addPost,
  deletePost,
};
