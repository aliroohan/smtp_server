import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const router = express.Router();

// POST /send-email
router.post('/send-email', async (req, res) => {
  const { name, email, country, phone, message } = req.body;

  const html_template = `
  <!DOCTYPE html>
    <html lang='en'>
    <head>
      <meta charset='UTF-8'>
      <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    </head>
    <body style='font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;'>
      <div style='max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);'>
        <div style='background-color: #A020F0; color: #ffffff; text-align: center; padding: 20px;'>
          <h1 style='margin: 0; font-size: 24px;'>Contact Form Submission</h1>
        </div>
        <div style='padding: 20px;'>
          <h2 style='color: #333333;'> <span style='font-weight: bold; color: #4CAF50;'>${name}</span>!</h2>
          <p style='margin: 10px 0; color: #555555;'><strong>Email:</strong> ${email}</p>
          <p style='margin: 10px 0; color: #555555;'><strong>Country:</strong> ${country}</p>
          <p style='margin: 10px 0; color: #555555;'><strong>Phone:</strong> ${phone}</p>
          <p style='margin: 10px 0; color: #555555;'><strong>Message:</strong> ${message}</p>
        </div>
        <div style='background-color: #f4f4f4; text-align: center; padding: 10px; font-size: 12px; color: #999999;'>
          <p style='margin: 0;'>&copy; 2025 TechAdvancer. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
    `

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
      to: process.env.EMAIL_TO  ,
      subject: 'Contact Form Submission',
      html: html_template,
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