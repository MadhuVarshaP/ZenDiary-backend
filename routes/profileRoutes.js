const express = require("express");
const router = express.Router();
const { getUserProfile, updateProfile } = require("../controllers/profileController");

// Protect this route to allow access only for logged-in users
router.get("/profile", getUserProfile);
router.get("/update-profile", updateProfile);

module.exports = router;
