const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');

const feedbackLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    message: "You have reached your daily feedback limit (Max 3). Please try again tomorrow."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'info.dou360@gmail.com',
    pass: 'daae avdt cwkx wnok'
  }
});

router.post('/', feedbackLimiter, async (req, res) => {
  const { username, email, subject, message } = req.body;

try {
    const mailOptions = {
      from: `"DOU360 Feedback" <info.dou360@gmail.com>`, // Görünen gönderen
      to: 'dou360.service@gmail.com', // <--- MAİLİN GİDECEĞİ ADRES
      subject: `[DOU360 Feedback] ${subject}`,
      text: `User: ${username}\n\nMessage:\n${message}`,
      html: `
        <h3>New Feedback Received</h3>
        <p><strong>User Name:</strong> ${username}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr/>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <br/>
        <small>This email was sent automatically from info.dou360@gmail.com</small>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Feedback sent successfully!" });

  } catch (error) {
    console.error("Mail sending error:", error);
    res.status(500).json({ success: false, message: "An error occurred. Please try again later." });
  }
});

module.exports = router;