const express = require("express");
const router = express.Router();

const {
  getPosts,
  addPost,
  deletePost,
} = require("../controllers/postsController");

router.get("/:uid", getPosts);
router.post("/", addPost);
router.delete("/delete/:pid", deletePost);

module.exports = router;
