const express = require("express");
const { addJournalEntry, getJournalEntries } = require("../controllers/journalController.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/add", addJournalEntry);
router.get("/entries", getJournalEntries); 
module.exports = router;
