const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isGlobal: {
      type: Boolean,
      required: true,
      default: false,
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
