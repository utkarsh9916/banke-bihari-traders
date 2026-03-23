const db = require("../config/db");
const nodemailer = require("nodemailer");

// Use promise-based queries
const promiseDb = db.promise();

exports.submitContact = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, email, subject and message are required"
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address"
    });
  }

  try {
    // 1️⃣ Save in MySQL - WITH AWAIT
    const query = `
      INSERT INTO leads (name, email, phone, subject, message)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await promiseDb.query(query, [name, email, phone, subject, message]);
    
    console.log(`✅ Lead saved with ID: ${result.insertId}`);

    // 2️⃣ Send Email - USING ENV VARIABLES
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "shribankebiharitraders141@gmail.com",
        pass: process.env.EMAIL_PASS // Move password to .env file!
      }
    });

    // Email to admin
    await transporter.sendMail({
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || "shribankebiharitraders141@gmail.com",
      replyTo: email,
      subject: `New Contact: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #EAB308; color: #000; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #EAB308; }
            .value { margin-left: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Name:</span>
                <span class="value">${name}</span>
              </div>
              <div class="field">
                <span class="label">Email:</span>
                <span class="value">${email}</span>
              </div>
              <div class="field">
                <span class="label">Phone:</span>
                <span class="value">${phone || 'Not provided'}</span>
              </div>
              <div class="field">
                <span class="label">Subject:</span>
                <span class="value">${subject}</span>
              </div>
              <div class="field">
                <span class="label">Message:</span>
                <p class="value">${message}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    });

    console.log("✅ Admin email sent");

    // 3️⃣ Send confirmation email to user
    await transporter.sendMail({
      from: `"Banke Bihari Traders" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for contacting Banke Bihari Traders",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #EAB308; color: #000; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .footer { text-align: center; padding: 20px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Contacting Us!</h1>
            </div>
            <div class="content">
              <p>Dear ${name},</p>
              <p>Thank you for reaching out to Banke Bihari Traders. We have received your message and will get back to you within 24 hours.</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong> ${message}</p>
              <p>We appreciate your interest in our products and services.</p>
              <p>Best regards,<br>Team Banke Bihari Traders</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Banke Bihari Traders. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    console.log("✅ User confirmation email sent");

    res.json({
      success: true,
      message: "Thank you for contacting us! We'll get back to you soon.",
      leadId: result.insertId
    });

  } catch (error) {
    console.error("❌ Error in contact form:", error);

    // Check what type of error
    if (error.code === 'ECONNREFUSED' || error.code === 'PROTOCOL_CONNECTION_LOST') {
      return res.status(503).json({
        success: false,
        message: "Database connection error. Please try again later."
      });
    }

    if (error.code === 'EAUTH') {
      return res.status(500).json({
        success: false,
        message: "Email configuration error. Please contact support."
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later."
    });
  }
};