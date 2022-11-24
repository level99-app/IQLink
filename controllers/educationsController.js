const Education = require("../models/education.model");
const asyncHandler = require("express-async-handler");

const getEducations = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Education.find({ education_holder: id });

    res.send(result);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

const addEducation = asyncHandler(async (req, res) => {
  try {
    const info = req.body;

    const newEducation = await Education.create(info);

    res.json(newEducation);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

const updateEducation = asyncHandler(async (req, res) => {
  const updates = req.body;
  const id = req.params.id;
  try {
    await Education.findByIdAndUpdate(id, updates);
  } catch (error) {
    console.log(error);
  }
});

const deleteEducation = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;

    await Education.findByIdAndDelete(id);

    res.send(200);
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  getEducations,
  addEducation,
  deleteEducation,
  updateEducation,
};
