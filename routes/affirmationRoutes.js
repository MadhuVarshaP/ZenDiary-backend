const express = require('express');
const { getAffirmation } = require('../controllers/affirmationController');
const router = express.Router();

// Define the route to fetch affirmations
router.get('/', getAffirmation);

module.exports = router;
