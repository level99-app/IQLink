const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const experienceSchema = new Schema(
  {
    experience_holder: { type: Schema.Types.ObjectId, ref: "User" },
    company_name: { type: String, required: true },
    position: { type: String, required: true },
    is_working: { type: Boolean, required: true },
    year_started: { type: Number, required: true },
    month_started: { type: Number, required: true },
    year_ended: { type: Number },
    month_ended: { type: Number },
    description: { type: String, required: false, maxlength: 300 },
  },
  { timestamps: true }
);

const Education = mongoose.model("Experience", experienceSchema);

module.exports = Education;
