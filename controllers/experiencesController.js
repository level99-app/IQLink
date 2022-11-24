const Experience = require("../models/experience.model");
const asyncHandler = require("express-async-handler");

const getExperiences = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Experience.find({ experience_holder: id });

    res.send(result);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

const addExperience = asyncHandler(async (req, res) => {
  try {
    const info = req.body;

    const newExperience = await Experience.create(info);

    res.json(newExperience);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

const updateExperience = asyncHandler(async (req, res) => {
  const updates = req.body;
  const id = req.params.id;
  try {
    await Experience.findByIdAndUpdate(id, updates);
  } catch (error) {
    console.log(error);
  }
});

const deleteExperience = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;

    await Experience.findByIdAndDelete(id);

    res.send(200);
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  getExperiences,
  addExperience,
  deleteExperience,
  updateExperience,
};
