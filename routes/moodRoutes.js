const express = require('express');
const router = express.Router();
const { getMoodData, saveMoodData } = require('../controllers/moodController');
const protect = require('../middleware/authMiddleware');

// Get mood data
router.get('/mood-data', protect, getMoodData);

// Save mood data
router.post('/save-mood', protect, saveMoodData);

module.exports = router;
