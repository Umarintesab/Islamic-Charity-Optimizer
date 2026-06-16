const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// ✅ CREATE APP FIRST
const app = express();

// ✅ CORS - Allow all origins for testing
app.use(cors({
  origin: '*',
  credentials: true
}));

// ✅ Middleware
app.use(express.json());

// ✅ MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/islamiccharityoptimizer_db';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully!');
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
    // Don't exit process, just log the error
  });

// ✅ User Schema
const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

// ✅ Test Route
app.get('/', (req, res) => {
  res.json({ message: '🚀 Backend is running!' });
});

// ✅ Register API
app.post('/api/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email already exists' 
      });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });
    
    await user.save();
    
    res.status(201).json({
      success: true,
      message: 'Registration successful! Please login.'
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during registration'
    });
  }
});

// ✅ Login API
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid password'
      });
    }
    
    // Create token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during login'
    });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/`);
});