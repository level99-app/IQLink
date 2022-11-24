const express = require("express");
const router = express.Router();

const {
  addEducation,
  deleteEducation,
  updateEducation,
  getEducations,
} = require("../controllers/educationsController");

router.get("/:id", getEducations);
router.post("/", addEducation);
router.delete("/:id", deleteEducation);
router.patch("/:id", updateEducation);

module.exports = router;
