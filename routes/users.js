const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe,
  updateUser,
  getUserByUsername,
  followUser,
} = require("../controllers/usersController");
const protect = require("../middleware/authMiddleware");

router.get("/username/:username", getUserByUsername);
router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me/:id", getMe);
router.patch("/me/:id", updateUser);
router.patch("/follow/:id", followUser);

module.exports = router;
