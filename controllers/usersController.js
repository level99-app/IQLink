const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");

const registerUser = asyncHandler(async (req, res) => {
  const { first_name, last_name, email, password, username } = req.body;

  if (!first_name || !last_name || !password || !email || !username) {
    res.status(400);
    throw new Error("Please add all field");
  }

  // check if user exists

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash Password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await User.create({
    first_name,
    last_name,
    email,
    username,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for User Email
  const user = await User.findOne({ email });

  if (user && bcrypt.compare(password, user.password)) {
    res.json({
      _id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    throw new Error("invalid credentials");
  }
});

const getMe = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);

  res.status(200).json(user);
});

const getUserByUsername = asyncHandler(async (req, res) => {
  const username = req.params.username;
  const user = await User.findOne({
    username: username,
  });

  res.json(user);
});

const followUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const followedId = req.body.id;
  const updates = req.body;
  const followedUpdates = {
    followers: id,
  };
  const userFollower = await User.findByIdAndUpdate({
    id,
    updates,
  });

  const userFollowed = await User.findByIdAndUpdate({
    followedId,
    followedUpdates,
  });

  res.json(userFollower);
  res.json(userFollowed);
});

const updateUser = asyncHandler(async (req, res) => {
  const updates = req.body;
  const id = req.body.id;
  try {
    const result = await User.findByIdAndUpdate(id, updates);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateUser,
  getUserByUsername,
  followUser,
};
