const Mood = require("../models/Mood"); 

// Controller to get mood data for the user
exports.getMoodData = async (req, res) => {
  try {
    const userId = req.user.id;
    const moodData = await Mood.find({ userId });
    res.status(200).json(moodData);
  } catch (err) {
    console.error('Error fetching mood data:', err);
    res.status(500).json({ message: "Error fetching mood data" });
  }
};

// Controller to save mood data
exports.saveMoodData = async (req, res) => {
  try {
    const { date, mood } = req.body;

    if (!date || !mood) {
      return res.status(400).json({ message: 'Date and mood are required' });
    }

    const userId = req.user.id; 
    const newMood = new Mood({ userId, date, mood }); 
    await newMood.save();

    res.status(201).json({ message: 'Mood data saved successfully', data: newMood });
  } catch (error) {
    console.error('Error saving mood data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
