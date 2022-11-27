const Follow = require("../models/follow.model");
const User = require("../models/user.model");
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
    await User.updateOne(
      { _id: req.body.follower },
      {
        $addToSet: {
          following: req.body.followed,
        },
      }
    );
    await User.updateOne(
      { _id: req.body.followed },
      {
        $addToSet: {
          followers: req.body.follower,
        },
      }
    );
    res.json(follow);
  } catch (error) {
    throw new Error("err: ", error);
  }
};

const deleteFollow = async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.body.follower },
      {
        $pull: {
          following: req.body.followed,
        },
      }
    );
    await User.updateOne(
      { _id: req.body.followed },
      {
        $pull: {
          followers: req.body.follower,
        },
      }
    );
    res.json(follow);
  } catch (error) {
    throw new Error("err: ", error);
  }
};

module.exports = {
  getFollowers,
  getFollowing,
  addFollow,
  deleteFollow,
};
