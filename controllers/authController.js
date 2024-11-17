const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

// Register
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const user = await User.create({ name, email, password });
  res.status(201).json({ token: generateToken(user._id) });
};

// Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  res.json({ token: generateToken(user._id) });
};
