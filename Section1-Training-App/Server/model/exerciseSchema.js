const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema(
  {
    exerciseId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: "none",
    },
    bodyParts: {
      type: [String],
      required: true,
    },
    equipments: {
      type: [String],
      required: true,
    },
    exerciseType: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true },
);

const Exercise = mongoose.model("Exercise", exerciseSchema);
module.exports = Exercise;
