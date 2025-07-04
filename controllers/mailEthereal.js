import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

// POST /send-email
router.post('/send-email', async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    // Create a test account (only needed once per app run)
    const testAccount = await nodemailer.createTestAccount();

    // Create a transporter object using the test SMTP account
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // Send mail
    const info = await transporter.sendMail({
      from: 'Ethereal Test <no-reply@example.com>',
      to,
      subject,
      text: message,
    });

    // Preview URL (Ethereal only)
    const previewUrl = nodemailer.getTestMessageUrl(info);

    res.status(200).json({
      message: 'Email sent (Ethereal)',
      previewUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Email failed to send' });
  }
});

export default router; 