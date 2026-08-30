const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authenticateToken = require('../middleware/auth');
const state = require('../utils/state');

// Registration
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, cellNumber, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(role);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      cellNumber,
      role,
    });

    await newUser.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, 'your_jwt_secret');

    res.status(200).json({ token, role: user.role });
    state.checkRole = user.role;
    state.checkEmail = user.email;
    
    console.log(state.checkEmail);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Example protected route (requires authentication)
router.get('/auth/protected', authenticateToken, (req, res) => {
  res.json({ message: 'You have access to this protected route', user: req.user });
});

// Sending Role
router.get('/checkRole', async (req, res) => {
  try {
    if (state.checkRole) {
      res.json({ role: state.checkRole });
    } else {
      res.status(404).send('Role not found');
    }
  } catch (error) {
    console.error('Error fetching user role:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Checking Email of Logged In user
router.get('/checkEmail', async (req, res) => {
  try {
    if (state.checkEmail) {
      res.json({ email: state.checkEmail });
      console.log('Email Sent to UI');
      console.log({ checkEmail: state.checkEmail });
    } else {
      res.status(404).send('Email not found');
    }
  } catch (error) {
    console.error('Error fetching user email:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Login Check
router.get('/checkName', async (req, res) => {
  try {
    console.log(state.checkEmail);
    res.json({ email: state.checkEmail });
  } catch (error) {
    console.error('Error checking user name:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Fetch patient user profile
router.get('/fetchProfileP', async (req, res) => {
  try {
    if (state.checkEmail) {
      const user = await User.findOne({ email: state.checkEmail });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const userProfile = {
        username: user.username,
        email: user.email,
        password: user.password,
        cellNumber: user.cellNumber,
        role: user.role,
      };
      
      return res.json(userProfile);
    } else {
      return res.status(401).json({ message: 'No user logged in' });
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update patient user profile
router.put('/updateProfileP', async (req, res) => {
  try {
    const updatedData = req.body;

    const user = await User.findOne({ email: state.checkEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.username = updatedData.username || user.username;
    user.email = updatedData.email || user.email;
    user.password = updatedData.password || user.password;
    user.cellNumber = updatedData.cellNumber || user.cellNumber;
    user.role = updatedData.role || user.role;
    
    await user.save();

    res.json({ message: 'User profile updated successfully' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Fetch non-patient user profile
router.get('/fetchProfile', async (req, res) => {
  try {
    if (state.checkEmail) {
      const user = await User.findOne({ email: state.checkEmail });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const userProfile = {
        name: user.username,
        email: user.email,
        role: user.role,
      };

      return res.json(userProfile);
    } else {
      return res.status(401).json({ message: 'No user logged in' });
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update non-patient user profile
router.put('/updateProfile', async (req, res) => {
  try {
    const updatedData = req.body;

    const user = await User.findOne({ email: state.checkEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.username = updatedData.username || user.username;
    user.email = updatedData.email || user.email;
    user.role = updatedData.role || user.role;

    await user.save();

    res.json({ message: 'User profile updated successfully' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Handling Logout
router.post('/logout', (req, res) => {
  const { loggedOut } = req.body;

  if (loggedOut === true) {
    state.checkEmail = null;
    res.json({ success: true });
  } else {
    res.status(400).json({ error: 'Invalid request' });
  }
});

module.exports = router;
