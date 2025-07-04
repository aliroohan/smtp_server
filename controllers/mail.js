// server.js or routes/email.js
import express from "express";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/send-email', async (req, res) => {
    console.log(req.body);
  const { to, subject, message } = req.body;

  const msg = {
    to,
    from: 'aliroohan321@gmail.com', // Verified sender
    subject,
    text: message,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Email failed to send' });
  }
});

export default router;
