import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const router = express.Router();

// POST /send-email
router.post('/send-email', async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      text: message,
    });

    res.status(200).json({
      message: 'Email sent',
      response: info.response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Email failed to send' });
  }
});

export default router; 