const mongoose = require("mongoose");

const workoutSchema = mongoose.Schema(
  {
    workoutName: {
      type: String,
      required: true,
    },
    exerciseList: [
      {
        exerciseRef: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Exercise",
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
