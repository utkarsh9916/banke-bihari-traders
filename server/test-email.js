const nodemailer = require("nodemailer");
require("dotenv").config();

async function testEmail() {
  console.log("Testing email with:", process.env.EMAIL_USER);
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    const info = await transporter.sendMail({
      from: `"Test" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "Test Email",
      text: "This is a test email"
    });
    
    console.log("✅ Test email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Test email failed:", error);
    console.error("Error code:", error.code);
    console.error("Error response:", error.response);
  }
}

testEmail();