const mongoose = require("mongoose");

const DataSchema = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  data: {
    type: String,
    require: true,
  },
});

const Data = mongoose.model("Data", DataSchema);

module.exports = Data;
