const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/authRoutes.js');
const affirmationRoutes = require('./routes/affirmationRoutes.js');
const moodRoutes = require('./routes/moodRoutes.js'); // Import moodRoutes
const journalRoutes = require('./routes/journalRoutes.js')
const profileRoutes = require('./routes/profileRoutes.js')
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json({ limit: "10mb" })); // Adjust the size as needed
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // For URL-encoded form data

// app.use(express.urlencoded({ extended: true })); 
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/affirmations', affirmationRoutes);
app.use('/api/moods', moodRoutes);  
app.use('/api/journal', journalRoutes);
app.use('/api', profileRoutes);

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
