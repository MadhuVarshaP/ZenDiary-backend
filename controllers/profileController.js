const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Assuming User model exists

exports.getUserProfile = async (req, res) => {
  try {
    // Extract JWT token from Authorization header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Decode the token to get the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Fetch the user data from the database
    const user = await User.findById(userId).select("-password"); // Exclude password field
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.updateProfile = async (req, res) => {
  try {
    // Extract JWT token from Authorization header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Decode the token to get the user ID
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error("JWT verification failed:", err);
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const userId = decoded.id;

    // Validate request body
    const { profilePicture } = req.body;
    if (!profilePicture) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    // Find the user by ID and update the profile picture
    const user = await User.findByIdAndUpdate(
      userId,
      { profilePicture },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
