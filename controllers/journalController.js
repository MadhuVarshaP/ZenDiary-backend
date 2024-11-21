const Journal = require("../models/Journal");
const jwt = require("jsonwebtoken");

exports.addJournalEntry = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    const { entry } = req.body;
    const userId = decoded.id;

    if (!entry) {
      return res.status(400).json({ message: "Journal entry cannot be empty" });
    }

    const newEntry = new Journal({
      userId,
      entry,
      date: new Date(),
    });

    await newEntry.save();
    res.status(201).json({ message: "Journal entry saved", data: newEntry });
  } catch (error) {
    console.error("Error saving journal entry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



exports.getJournalEntries = async (req, res) => {
  try {
    // Extract and verify the token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    const userId = decoded.id; 
    console.log("User ID from token:", userId);

    const entries = await Journal.find({ userId }).sort({ date: -1 });
    console.log("Fetched Journal Entries:", entries);

    res.status(200).json(entries);
  } catch (error) {
    console.error("Error fetching journal entries:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
