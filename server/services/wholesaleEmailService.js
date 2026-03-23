const nodemailer = require("nodemailer");

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(amount);
};

// Send email to admin about new wholesale inquiry
const sendWholesaleAdminEmail = async (inquiryData) => {
  console.log("📧 Preparing wholesale admin email...");
  
  const {
    id, businessName, ownerName, email, phone, alternatePhone,
    gstNumber, businessType, yearsInBusiness, address, city,
    state, pincode, country, products, estimatedQuantity,
    preferredTimeline, monthlyRequirement, additionalNotes
  } = inquiryData;

  // Get timeline label
  const timelineLabels = {
    immediate: "🚀 Immediate (Within 1 week)",
    urgent: "⚡ Urgent (1-2 weeks)",
    normal: "📦 Normal (2-4 weeks)",
    flexible: "🔄 Flexible (1-2 months)",
    future: "📅 Future Planning"
  };

  // Get monthly requirement label
  const monthlyLabels = {
    "less-than-50k": "Less than ₹50,000",
    "50k-1lac": "₹50,000 - ₹1,00,000",
    "1lac-5lac": "₹1,00,000 - ₹5,00,000",
    "5lac-10lac": "₹5,00,000 - ₹10,00,000",
    "more-than-10lac": "More than ₹10,00,000"
  };

  const mailOptions = {
    from: `"Banke Bihari Traders" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    replyTo: email,
    subject: `🚀 New Wholesale Inquiry: ${businessName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #EAB308; color: #000; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { padding: 20px; background: #f9f9f9; border: 1px solid #ddd; }
          .section { margin-bottom: 25px; }
          .section-title { font-size: 18px; font-weight: bold; color: #EAB308; margin-bottom: 10px; border-bottom: 2px solid #EAB308; padding-bottom: 5px; }
          .field { margin-bottom: 10px; }
          .label { font-weight: bold; color: #555; display: inline-block; width: 150px; }
          .value { color: #333; }
          .badge { background: #EAB308; color: #000; padding: 5px 10px; border-radius: 5px; font-size: 12px; font-weight: bold; }
          .footer { text-align: center; padding: 20px; background: #333; color: white; border-radius: 0 0 10px 10px; }
          table { width: 100%; border-collapse: collapse; }
          td { padding: 8px; border-bottom: 1px solid #ddd; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin:0;">🚀 New Wholesale Inquiry</h1>
            <p style="margin:5px 0 0; color:#333;">ID: #${id}</p>
          </div>
          
          <div class="content">
            <div class="section">
              <div class="section-title">🏢 Business Details</div>
              <table>
                <tr><td class="label">Business Name:</td><td class="value">${businessName}</td></tr>
                <tr><td class="label">Owner/Contact:</td><td class="value">${ownerName}</td></tr>
                <tr><td class="label">Email:</td><td class="value"><a href="mailto:${email}">${email}</a></td></tr>
                <tr><td class="label">Phone:</td><td class="value"><a href="tel:${phone}">${phone}</a></td></tr>
                ${alternatePhone ? `<tr><td class="label">Alternate Phone:</td><td class="value">${alternatePhone}</td></tr>` : ''}
                ${gstNumber ? `<tr><td class="label">GST Number:</td><td class="value">${gstNumber}</td></tr>` : ''}
                <tr><td class="label">Business Type:</td><td class="value"><span class="badge">${businessType || 'Not specified'}</span></td></tr>
                ${yearsInBusiness ? `<tr><td class="label">Years in Business:</td><td class="value">${yearsInBusiness} years</td></tr>` : ''}
              </table>
            </div>

            <div class="section">
              <div class="section-title">📍 Address</div>
              <table>
                <tr><td class="label">Address:</td><td class="value">${address}</td></tr>
                <tr><td class="label">City:</td><td class="value">${city}</td></tr>
                <tr><td class="label">State:</td><td class="value">${state}</td></tr>
                <tr><td class="label">Pincode:</td><td class="value">${pincode}</td></tr>
                <tr><td class="label">Country:</td><td class="value">${country}</td></tr>
              </table>
            </div>

            <div class="section">
              <div class="section-title">📦 Order Details</div>
              <table>
                <tr><td class="label">Products Interested:</td><td class="value">${products}</td></tr>
                <tr><td class="label">Estimated Quantity:</td><td class="value">${estimatedQuantity}</td></tr>
                <tr><td class="label">Preferred Timeline:</td><td class="value">${timelineLabels[preferredTimeline] || preferredTimeline}</td></tr>
                ${monthlyRequirement ? `<tr><td class="label">Monthly Requirement:</td><td class="value">${monthlyLabels[monthlyRequirement] || monthlyRequirement}</td></tr>` : ''}
                ${additionalNotes ? `<tr><td class="label">Additional Notes:</td><td class="value">${additionalNotes}</td></tr>` : ''}
              </table>
            </div>

            ${inquiryData.documentPath ? `
            <div class="section">
              <div class="section-title">📎 Document</div>
              <p><a href="${process.env.BASE_URL || 'http://localhost:5000'}${inquiryData.documentPath}" target="_blank">View Uploaded Document</a></p>
            </div>
            ` : ''}
          </div>

          <div class="footer">
            <p style="margin:0;">Received at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            <p style="margin:5px 0 0; font-size:12px;">© ${new Date().getFullYear()} Banke Bihari Traders</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  return await transporter.sendMail(mailOptions);
};

// Send confirmation email to the business
const sendWholesaleUserEmail = async (inquiryData) => {
  console.log("📧 Preparing wholesale user confirmation email...");
  
  const {
    businessName, ownerName, email, products, estimatedQuantity,
    preferredTimeline, id
  } = inquiryData;

  // Get timeline label
  const timelineLabels = {
    immediate: "Immediate (Within 1 week)",
    urgent: "Urgent (1-2 weeks)",
    normal: "Normal (2-4 weeks)",
    flexible: "Flexible (1-2 months)",
    future: "Future Planning"
  };

  const mailOptions = {
    from: `"Banke Bihari Traders - B2B Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `🎉 Thank you for your wholesale inquiry - Banke Bihari Traders`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #EAB308; color: #000; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { padding: 30px; background: #f9f9f9; border: 1px solid #ddd; }
          .footer { text-align: center; padding: 20px; background: #333; color: white; border-radius: 0 0 10px 10px; }
          .button { background: #EAB308; color: #000; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; margin: 10px 0; }
          .details { background: white; padding: 15px; border-radius: 5px; margin: 20px 0; }
          .highlight { color: #EAB308; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin:0;">🎉 Thank You!</h1>
            <p style="margin:5px 0 0; font-size:18px;">Your wholesale inquiry has been received</p>
          </div>
          
          <div class="content">
            <p>Dear <strong>${ownerName || businessName}</strong>,</p>
            
            <p>Thank you for showing interest in partnering with <strong>Banke Bihari Traders</strong>. We have received your wholesale inquiry and our B2B team is reviewing the details.</p>

            <div class="details">
              <h3 style="color:#EAB308; margin-top:0;">📋 Inquiry Summary</h3>
              <p><strong>Inquiry ID:</strong> #${id}</p>
              <p><strong>Business Name:</strong> ${businessName}</p>
              <p><strong>Products Interested:</strong> ${products}</p>
              <p><strong>Estimated Quantity:</strong> ${estimatedQuantity}</p>
              <p><strong>Preferred Timeline:</strong> ${timelineLabels[preferredTimeline] || preferredTimeline}</p>
            </div>

            <p><strong>What happens next?</strong></p>
            <ol>
              <li>Our B2B specialist will review your requirements within <span class="highlight">24 hours</span></li>
              <li>You'll receive a detailed quotation with wholesale pricing</li>
              <li>We'll schedule a call to discuss partnership opportunities</li>
            </ol>

            <p>In the meantime, if you have any urgent questions, feel free to contact us:</p>
            
            <div style="text-align: center; margin: 25px 0;">
              <a href="tel:+918439424125" class="button" style="margin-right:10px;">📞 Call Us</a>
              <a href="https://wa.me/918439424125" class="button" style="background:#25D366;">💬 WhatsApp</a>
            </div>

            <p>We look forward to a successful partnership!</p>
            
            <p>Best regards,<br>
            <strong>B2B Team</strong><br>
            Banke Bihari Traders</p>
          </div>

          <div class="footer">
            <p style="margin:0;">© ${new Date().getFullYear()} Banke Bihari Traders. All rights reserved.</p>
            <p style="margin:5px 0 0; font-size:12px;">Darling Road, Sahaswan, Budaun, UP - 243638</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = {
  sendWholesaleAdminEmail,
  sendWholesaleUserEmail
};