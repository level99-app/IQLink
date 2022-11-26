const Follow = require("../models/follow.model");

const getFollowers = async (req, res) => {
  try {
    const followers = await Follow.find({ follower: req.params.id });
    res.json(followers);
  } catch (error) {
    throw new Error("err: ", error);
  }
};

const getFollowing = async (req, res) => {
  try {
    const following = await Follow.findOne({ followed: req.params.id });
    res.json(following);
  } catch (error) {
    throw new Error("err: ", error);
  }
};

const addFollow = async (req, res) => {
  try {
    const follow = await Follow.create(req.body);
    res.json(follow);
  } catch (error) {
    throw new Error("err: ", error);
  }
};

module.exports = {
  getFollowers,
  getFollowing,
  addFollow,
};
