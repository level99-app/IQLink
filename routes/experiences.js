const express = require("express");
const router = express.Router();

const {
  getExperiences,
  addExperience,
  deleteExperience,
  updateExperience,
} = require("../controllers/experiencesController");

router.get("/:id", getExperiences);
router.post("/", addExperience);
router.delete("/:id", deleteExperience);
router.patch("/:id", updateExperience);

module.exports = router;
