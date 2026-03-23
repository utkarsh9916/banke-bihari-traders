const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { sendWholesaleAdminEmail, sendWholesaleUserEmail } = require("../services/wholesaleEmailService");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `wholesale-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|jpg|jpeg|png|doc|docx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only PDF, JPG, JPEG, PNG, DOC, DOCX files are allowed"));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter
});

// Use promise-based db
const promiseDb = db.promise();

// CREATE WHOLESALE INQUIRY
router.post("/wholesale", upload.single("document"), async (req, res) => {
  console.log("\n📝 ===== NEW WHOLESALE INQUIRY =====");
  console.log("Body:", req.body);
  console.log("File:", req.file);
  
  try {
    const {
      businessName, ownerName, email, phone, alternatePhone,
      gstNumber, businessType, yearsInBusiness, address, city,
      state, pincode, country, products, estimatedQuantity,
      preferredTimeline, monthlyRequirement, additionalNotes
    } = req.body;

    // Validate required fields
    if (!businessName || !ownerName || !email || !phone || !address || 
        !city || !state || !pincode || !products || !estimatedQuantity || !preferredTimeline) {
      
      // Clean up uploaded file if validation fails
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      
      return res.status(400).json({
        success: false,
        error: "Missing required fields. Please fill all mandatory fields."
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        error: "Please provide a valid email address"
      });
    }

    // Insert into database
    const sql = `
      INSERT INTO wholesale_inquiries (
        business_name, owner_name, email, phone, alternate_phone,
        gst_number, business_type, years_in_business, address, city,
        state, pincode, country, products, estimated_quantity,
        preferred_timeline, monthly_requirement, additional_notes, document_path
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const documentPath = req.file ? `/uploads/${req.file.filename}` : null;

    const [result] = await promiseDb.query(sql, [
      businessName, ownerName, email, phone, alternatePhone || null,
      gstNumber || null, businessType || null, yearsInBusiness || null,
      address, city, state, pincode, country || "India",
      products, estimatedQuantity, preferredTimeline,
      monthlyRequirement || null, additionalNotes || null, documentPath
    ]);

    console.log(`✅ Wholesale inquiry saved with ID: ${result.insertId}`);

    // Prepare data for emails
    const inquiryData = {
      id: result.insertId,
      businessName,
      ownerName,
      email,
      phone,
      alternatePhone,
      gstNumber,
      businessType,
      yearsInBusiness,
      address,
      city,
      state,
      pincode,
      country,
      products,
      estimatedQuantity,
      preferredTimeline,
      monthlyRequirement,
      additionalNotes,
      documentPath
    };

    // Send emails
    let emailErrors = [];

    try {
      await sendWholesaleAdminEmail(inquiryData);
      console.log("✅ Admin email sent successfully");
    } catch (emailError) {
      console.error("❌ Admin email failed:", emailError.message);
      emailErrors.push("admin");
    }

    try {
      await sendWholesaleUserEmail(inquiryData);
      console.log("✅ User email sent successfully");
    } catch (emailError) {
      console.error("❌ User email failed:", emailError.message);
      emailErrors.push("user");
    }

    // Send response
    if (emailErrors.length === 0) {
      res.json({
        success: true,
        message: "🎉 Thank you for your wholesale inquiry! Our B2B team will contact you within 24 hours with exclusive pricing.",
        inquiryId: result.insertId
      });
    } else {
      res.json({
        success: true,
        warning: true,
        message: "✅ Your inquiry was saved successfully. There was a minor issue with email notifications, but our team will still contact you.",
        inquiryId: result.insertId
      });
    }

  } catch (error) {
    console.error("❌ Server error:", error);
    
    // Clean up uploaded file if error
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error("Error deleting file:", unlinkError);
      }
    }

    res.status(500).json({
      success: false,
      error: "Something went wrong. Please try again later."
    });
  }
});

// GET ALL WHOLESALE INQUIRIES (Admin only)
router.get("/wholesale", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    
    // Get total count
    const [countResult] = await promiseDb.query("SELECT COUNT(*) as total FROM wholesale_inquiries");
    
    // Get paginated data
    const [results] = await promiseDb.query(
      "SELECT * FROM wholesale_inquiries ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [limit, offset]
    );
    
    res.json({
      success: true,
      data: results,
      pagination: {
        total: countResult[0].total,
        page,
        limit,
        pages: Math.ceil(countResult[0].total / limit)
      }
    });
    
  } catch (error) {
    console.error("❌ Error fetching wholesale inquiries:", error);
    res.status(500).json({ 
      success: false, 
      error: "Database error" 
    });
  }
});

// GET SINGLE WHOLESALE INQUIRY
router.get("/wholesale/:id", async (req, res) => {
  try {
    const [results] = await promiseDb.query(
      "SELECT * FROM wholesale_inquiries WHERE id = ?",
      [req.params.id]
    );
    
    if (results.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: "Inquiry not found" 
      });
    }
    
    res.json({
      success: true,
      data: results[0]
    });
    
  } catch (error) {
    console.error("❌ Error fetching inquiry:", error);
    res.status(500).json({ 
      success: false, 
      error: "Database error" 
    });
  }
});

// UPDATE INQUIRY STATUS
router.put("/wholesale/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['new', 'contacted', 'negotiating', 'converted', 'rejected'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        error: "Invalid status" 
      });
    }
    
    const [result] = await promiseDb.query(
      "UPDATE wholesale_inquiries SET status = ? WHERE id = ?",
      [status, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false, 
        error: "Inquiry not found" 
      });
    }
    
    res.json({
      success: true,
      message: "Status updated successfully"
    });
    
  } catch (error) {
    console.error("❌ Error updating inquiry:", error);
    res.status(500).json({ 
      success: false, 
      error: "Database error" 
    });
  }
});

module.exports = router;