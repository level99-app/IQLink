const express = require("express");
const router = express.Router();

const {
  getFollowers,
  getFollowing,
  addFollow,
} = require("../controllers/followsController");

router.get("/followers/:id", getFollowers);
router.get("/following/:id", getFollowing);
router.post("/", addFollow);

module.exports = router;
