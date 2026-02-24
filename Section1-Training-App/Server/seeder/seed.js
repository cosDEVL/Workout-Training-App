require("dotenv").config();
const mongoose = require("mongoose");
const Exercise = require("../model/exerciseSchema");
const customExercises = require("./customExercises");

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected!");

    console.log("Svuotamento della collezione attuale Exercises");
    await Exercise.deleteMany({});

    console.log("Inserimento degli esercizi custom nella collezione Exercises");
    await Exercise.insertMany(customExercises);

    console.log("Seeding completato!");
    process.exit(0);
  } catch (error) {
    console.log("Error:", error);
    process.exit(1);
  }
};

seedDatabase();
