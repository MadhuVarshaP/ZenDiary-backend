const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/authRoutes.js');
const affirmationRoutes = require('./routes/affirmationRoutes.js');
const moodRoutes = require('./routes/moodRoutes.js');
const journalRoutes = require('./routes/journalRoutes.js');
const profileRoutes = require('./routes/profileRoutes.js');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(
  cors({
    origin: ["https://zendiary.netlify.app", "http://localhost:3000"], // Allow local testing
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/affirmations', affirmationRoutes);
app.use('/api/moods', moodRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api', profileRoutes); 

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
