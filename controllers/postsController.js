const Post = require("../models/post.model");
const User = require("../models/user.model");

const getPosts = async (req, res) => {
  try {
    const profilePosts = await Post.find({ post_origin: req.params.uid });
    res.json(profilePosts);
  } catch (error) {
    throw new Error("err: ", error);
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ post_origin: req.params.pid });
    res.json(post);
  } catch (error) {
    throw new Error("err: ", error);
  }
};

const addPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    const postOrigin = req.body.post_origin;
    const postId = req.body.id;
    res.json(post);
    await User.findByIdAndUpdate(postOrigin, { posts: postId }, { new: true });
  } catch (error) {
    throw new Error("err: ", error);
  }
};

const deletePost = async (req, res) => {
  const postOrigin = req.body.post_origin;
  const postId = req.body.id;
  try {
    const post = await Post.findByIdAndDelete(postId);

    res.json(post);
    await User.findByIdAndUpdate(postOrigin, { posts: postId }, { new: true });
  } catch (error) {
    throw new Error("err: ", error);
  }
};

module.exports = {
  getPost,
  getPosts,
  addPost,
  deletePost,
};
