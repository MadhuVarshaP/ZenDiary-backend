const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mood: { type: Number, required: true }, // Mood can be a value from 1 to 5
  date: { type: String, required: true },  // Date in YYYY-MM-DD format
});

const Mood = mongoose.model("Mood", moodSchema);

module.exports = Mood;
