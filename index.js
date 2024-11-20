const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/authRoutes.js');
const affirmationRoutes = require('./routes/affirmationRoutes.js');
const moodRoutes = require('./routes/moodRoutes.js'); // Import moodRoutes

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/affirmations', affirmationRoutes);
app.use('/api/moods', moodRoutes);  

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
