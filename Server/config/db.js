const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("Local MongoDB connected!");
  } catch (error) {
    console.log("Error during connection to local MongoDB Server:", error);
    process.exit(1);
  }
}

module.exports = connectDB;
