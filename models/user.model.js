const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      maxlength: 40,
      default: "",
    },
    bio: {
      type: String,
      maxlength: 1000,
      default: "",
    },
    about: {
      type: String,
      maxlength: 3000,
      default: "",
    },
    city: {
      type: String,
      trim: true,
      default: "",
    },
    state: {
      type: String,
      trim: true,
      default: "",
    },
    country: {
      type: String,
      trim: true,
      default: "",
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 5,
    },
    profile_image: {
      type: String,
      default: "",
    },
    banner_image: {
      type: String,
      default: "",
    },
    teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
    education: [{ type: Schema.Types.ObjectId, ref: "Education" }],
    experience: [{ type: Schema.Types.ObjectId, ref: "Experience" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    post_likes: [{ type: Schema.Types.ObjectId, ref: "Postlike" }],
    comment_likes: [{ type: Schema.Types.ObjectId, ref: "Commentlike" }],
    post_shares: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    sent_messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    recieved_messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
