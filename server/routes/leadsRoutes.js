const express = require("express");
const router = express.Router();
const db = require("../config/db");
const verifyToken = require("../middleware/authMiddleware");
const { sendLeadEmail, sendUserConfirmation } = require("../services/emailService");

// IMPORTANT: Get promise-based version for async/await
const promiseDb = db.promise();

// CREATE LEAD - UPDATED WITH PROPER EMAIL HANDLING
router.post("/leads", async (req, res) => {  // 👈 Made async
  try {
    const { name, email, phone, subject, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false,
        error: "Name, email, subject and message are required" 
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false,
        error: "Please provide a valid email address" 
      });
    }

    const sql = "INSERT INTO leads (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)";

    // Use promise version for cleaner code
    const [result] = await promiseDb.query(sql, [name, email, phone, subject, message]);
    
    console.log(`✅ Lead saved with ID: ${result.insertId}`);

    // Send emails - WITH AWAIT to ensure they complete
    let emailErrors = [];
    
    try {
      await sendLeadEmail({ name, email, phone, subject, message });
      console.log("✅ Admin email sent successfully");
    } catch (emailError) {
      console.error("❌ Admin email failed:", emailError.message);
      emailErrors.push("admin");
    }

    try {
      await sendUserConfirmation({ name, email, subject, message });
      console.log("✅ User confirmation email sent successfully");
    } catch (emailError) {
      console.error("❌ User confirmation email failed:", emailError.message);
      emailErrors.push("user");
    }
    
    // Send response based on email status
    if (emailErrors.length === 0) {
      res.json({ 
        success: true,
        message: "Thank you for contacting us! We'll get back to you soon.",
        leadId: result.insertId 
      });
    } else {
      res.json({ 
        success: true,
        warning: true,
        message: "Your message was saved, but there was an issue sending email notifications.",
        leadId: result.insertId 
      });
    }
    
  } catch (error) {
    console.error("❌ Server error:", error);
    
    // Check for specific database errors
    if (error.code === 'ECONNREFUSED' || error.code === 'PROTOCOL_CONNECTION_LOST') {
      return res.status(503).json({ 
        success: false,
        error: "Database connection error. Please try again later." 
      });
    }
    
    res.status(500).json({ 
      success: false,
      error: "Something went wrong. Please try again later." 
    });
  }
});

// GET ALL LEADS (with pagination)
router.get("/leads", verifyToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const offset = (page - 1) * limit;
    
    // Get total count
    const [countResult] = await promiseDb.query("SELECT COUNT(*) as total FROM leads");
    
    // Get paginated data
    const [results] = await promiseDb.query(
      "SELECT * FROM leads ORDER BY created_at DESC LIMIT ? OFFSET ?",
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
    console.error("❌ Error fetching leads:", error);
    res.status(500).json({ 
      success: false, 
      error: "Database error" 
    });
  }
});

// GET SINGLE LEAD
router.get("/leads/:id", verifyToken, async (req, res) => {
  try {
    const [results] = await promiseDb.query(
      "SELECT * FROM leads WHERE id = ?",
      [req.params.id]
    );
    
    if (results.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: "Lead not found" 
      });
    }
    
    res.json({
      success: true,
      data: results[0]
    });
    
  } catch (error) {
    console.error("❌ Error fetching lead:", error);
    res.status(500).json({ 
      success: false, 
      error: "Database error" 
    });
  }
});

// UPDATE LEAD STATUS
router.put("/leads/:id", verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['new', 'contacted', 'converted'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        error: "Invalid status" 
      });
    }
    
    const [result] = await promiseDb.query(
      "UPDATE leads SET status = ? WHERE id = ?",
      [status, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false, 
        error: "Lead not found" 
      });
    }
    
    res.json({
      success: true,
      message: "Lead status updated successfully"
    });
    
  } catch (error) {
    console.error("❌ Error updating lead:", error);
    res.status(500).json({ 
      success: false, 
      error: "Database error" 
    });
  }
});

// DELETE LEAD
router.delete("/leads/:id", verifyToken, async (req, res) => {
  try {
    const [result] = await promiseDb.query(
      "DELETE FROM leads WHERE id = ?",
      [req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false, 
        error: "Lead not found" 
      });
    }
    
    res.json({
      success: true,
      message: "Lead deleted successfully"
    });
    
  } catch (error) {
    console.error("❌ Error deleting lead:", error);
    res.status(500).json({ 
      success: false, 
      error: "Database error" 
    });
  }
});

module.exports = router;