const mongoose = require("mongoose");

const workoutSchema = mongoose.Schema(
  {
    workoutName: {
      type: String,
      required: true,
    },
    exerciseList: [
      {
        exerciseId: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        sets: [
          {
            reps: {
              type: Number,
              required: true,
            },
            weight: Number,
          },
        ],
      },
    ],
  },
  { timestamps: true },
);

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;
