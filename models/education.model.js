const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const educationSchema = new Schema(
  {
    education_holder: { type: Schema.Types.ObjectId, ref: "User" },
    school_name: { type: String, required: true },
    degree_earned: { type: String, required: true },
    is_attending: { type: Boolean, required: true },
    year_started: { type: Number, required: true },
    month_started: { type: Number, required: true },
    year_ended: { type: Number },
    month_ended: { type: Number },
    description: { type: String, required: false, maxlength: 300 },
  },
  { timestamps: true }
);

const Education = mongoose.model("Education", educationSchema);

module.exports = Education;
