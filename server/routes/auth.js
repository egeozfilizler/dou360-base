const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Verification = require('../models/Verification');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

// Mail transport configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

router.post('/send-code', async (req, res) => {
  const { email, password } = req.body;

  const passwordRules = [
    { 
      condition: password.length < 6, 
      message: 'Password must be at least 6 characters.' 
    },
    { 
      condition: password.length > 22, 
      message: 'Password can be at most 22 characters.' 
    },
    { 
      condition: /^(\d+|[a-z]+|[A-Z]+|[^a-zA-Z0-9]+)$/.test(password), 
      message: 'Password is not secure.' 
    }
  ];

  const failedRule = passwordRules.find(rule => rule.condition);
  if (failedRule) {
    return res.status(400).json({ message: failedRule.message });
  }

  const emailRegex = /^[a-zA-Z0-9]+@dogus\.edu\.tr$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please enter a valid Dogus University email address.' });
  }

  try {
    // Ensure the email is not already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'This email address is already registered.' });
    }

    // Generate 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Replace any existing code and save the new one
    await Verification.findOneAndDelete({ email });
    await new Verification({ email, code }).save();

    // Send verification email
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'DOU360 Verification Code',
      html: `
        <h3>Welcome!</h3>
        <p>Your verification code for completing your DOU360 registration:</p>
        <h1 style="color: #bd2d28; letter-spacing: 5px;">${code}</h1>
        <p>This code is valid for 10 minutes.</p>
      `
    });

    res.status(200).json({ message: 'Verification code sent.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Email could not be sent. Please try again.' });
  }
});

// Step 2: Verify code and sign up
router.post('/signup', async (req, res) => {
  const { username, email, password, code } = req.body;
  if (!username || /[^a-zA-Z0-9]/.test(username)) {
    return res.status(400).json({ message: 'Username cannot contain spaces or special characters.' });
  }

  const passwordRules = [
    { 
      condition: password.length < 6, 
      message: 'Password must be at least 6 characters.' 
    },
    { 
      condition: password.length > 22, 
      message: 'Password can be at most 22 characters.' 
    },
    { 
      condition: /^(\d+|[a-z]+|[A-Z]+|[^a-zA-Z0-9]+)$/.test(password), 
      message: 'Password is not secure.' 
    }
  ];

  const failedRule = passwordRules.find(rule => rule.condition);
  if (failedRule) {
    return res.status(400).json({ message: failedRule.message });
  }
  try {
    // Verify the code stored in the database
    const record = await Verification.findOne({ email });
    
    if (!record || record.code !== code) {
      return res.status(400).json({ message: 'Invalid or expired verification code.' });
    }
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    
    if (existingUser) {
      if (existingUser.email === email) return res.status(400).json({ message: 'This email is already registered.' });
      if (existingUser.username === username) return res.status(400).json({ message: 'This username is already taken.' });
    }

    // Code is valid, create the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    await Verification.deleteOne({ email });
    res.status(201).json({ message: 'Registration successful.' });

  } catch (error) {
    res.status(500).json({ message: 'An error occurred during registration.' });
  }
});

router.post('/signin', async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const user = await User.findOne({ 
      $or: [{ email: identifier }, { username: identifier }] 
    });

    if (!user) return res.status(400).json({ message: 'User not found.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect password.' });

    const token = jwt.sign(
      { id: user._id, email: user.email }, 
      process.env.JWT_SECRET,             
      { expiresIn: '30d' }                
    );

    res.status(200).json({ 
      message: 'Sign-in successful', 
      token, 
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email 
      } 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});
  router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found with this email.' });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    await Verification.findOneAndDelete({ email }); 
    await new Verification({ email, code }).save(); 

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'DOU360 Password Reset Code',
      html: `
        <h3>Password Reset Request</h3>
        <p>Use the code below to reset your account password:</p>
        <h1 style="color: #DC2626; letter-spacing: 5px;">${code}</h1>
        <p>This code is valid for 10 minutes. Do not share it with anyone.</p>
      `
    });

    res.status(200).json({ message: 'Verification code sent to your email.' });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: 'Failed to send email. Please try again.' });
  }
});

// 4. RESET PASSWORD (Verify Code & Set New Password)
router.post('/reset-password', async (req, res) => {
  const { email, code, newPassword } = req.body;

  const passwordRules = [
    { condition: !newPassword, message: 'Please enter a new password.' },
    { condition: newPassword?.length < 6, message: 'Password is too short. Minimum 6 characters required.' },
    { condition: newPassword?.length > 22, message: 'Password is too long. Maximum 22 characters allowed.' },
    { condition: /^(\d+|[a-z]+|[A-Z]+|[^a-zA-Z0-9]+)$/.test(newPassword || ""), message: 'Password is too simple. Please mix letters, numbers, or symbols.' }
  ];
  
  const failedRule = passwordRules.find(rule => rule.condition);
  if (failedRule) return res.status(400).json({ message: failedRule.message });

  try {
    const record = await Verification.findOne({ email });
    if (!record || record.code !== code) {
      return res.status(400).json({ message: 'Invalid or expired verification code.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.findOneAndUpdate({ email }, { password: hashedPassword });

    await Verification.deleteOne({ email });

    res.status(200).json({ message: 'Password reset successfully. You can now sign in.' });

  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: 'An error occurred during password reset.' });
  }
});
module.exports = router;