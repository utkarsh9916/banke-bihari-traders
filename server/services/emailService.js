const nodemailer = require("nodemailer");

console.log("📧 Initializing email service...");
console.log("Email user:", process.env.EMAIL_USER);
console.log("Email pass length:", process.env.EMAIL_PASS ? "✅ Set" : "❌ Not set");

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  debug: true, // Enable debug logs
  logger: true // Log to console
});

// Verify transporter connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transporter verification failed:");
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
  } else {
    console.log("✅ Email transporter is ready to send emails");
  }
});

// Send email to admin
const sendLeadEmail = async (leadData) => {
  console.log("\n📧 [ADMIN EMAIL] Starting...");
  console.log("Data received:", {
    name: leadData.name,
    email: leadData.email,
    subject: leadData.subject
  });
  
  const { name, email, phone, subject, message } = leadData;
  
  const mailOptions = {
    from: `"Banke Bihari Traders" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    replyTo: email,
    subject: `New Lead: ${subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong> ${message}</p>
    `
  };

  console.log("📤 Attempting to send admin email to:", process.env.ADMIN_EMAIL);
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Admin email sent! Message ID:", info.messageId);
    console.log("Response:", info.response);
    return info;
  } catch (error) {
    console.error("❌ Admin email failed!");
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    console.error("Full error:", error);
    throw error;
  }
};

// Send confirmation email to user
const sendUserConfirmation = async (leadData) => {
  console.log("\n📧 [USER EMAIL] Starting for:", leadData.email);
  
  const { name, email, subject, message } = leadData;
  
  const mailOptions = {
    from: `"Banke Bihari Traders" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Thank you for contacting Banke Bihari Traders",
    html: `
      <h2>Thank You for Contacting Us!</h2>
      <p>Dear ${name},</p>
      <p>We have received your message and will get back to you within 24 hours.</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong> ${message}</p>
      <p>Best regards,<br>Team Banke Bihari Traders</p>
    `
  };

  console.log("📤 Attempting to send user email to:", email);
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ User email sent! Message ID:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ User email failed!");
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    throw error;
  }
};

module.exports = {
  sendLeadEmail,
  sendUserConfirmation
};