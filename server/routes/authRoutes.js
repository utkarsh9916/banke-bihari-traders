const express = require("express");
const router = express.Router();
const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { OAuth2Client } = require('google-auth-library');

const SECRET_KEY = "mysecretkey";
const GOOGLE_CLIENT_ID = "1025698917146-3e8tlo5utl5mq0ptr06dnehpg6njc8t1.apps.googleusercontent.com";
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// ✅ SIGNUP API - Email/Password
router.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if user already exists
    const checkSql = "SELECT * FROM users WHERE email = ?";
    db.query(checkSql, [email], async (err, results) => {
      if (err) {
        console.error("Signup DB error:", err);
        return res.status(500).json({ success: false, error: "Database error" });
      }

      if (results.length > 0) {
        return res.status(400).json({ success: false, error: "User already exists with this email" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user
      const insertSql = "INSERT INTO users (name, email, phone, password, provider) VALUES (?, ?, ?, ?, 'email')";
      db.query(insertSql, [name, email, phone || null, hashedPassword], (err, result) => {
        if (err) {
          console.error("Signup insert error:", err);
          return res.status(500).json({ success: false, error: "Database error" });
        }

        // Generate JWT token
        const token = jwt.sign(
          { id: result.insertId, email: email },
          SECRET_KEY,
          { expiresIn: "7d" }
        );

        res.json({
          success: true,
          message: "Signup successful!",
          token: token,
          user: {
            id: result.insertId,
            name: name,
            email: email
          }
        });
      });
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// ✅ LOGIN API - Email/Password (Admin + Users)
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Pehle admins table mein check karo
  const adminSql = "SELECT * FROM admins WHERE email = ?";
  db.query(adminSql, [email], async (err, adminResults) => {
    if (err) {
      return res.status(500).json({ success: false, error: "Database error" });
    }

    // Agar admin mil gaya
    if (adminResults.length > 0) {
      const admin = adminResults[0];
      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid password ❌" });
      }

      const token = jwt.sign(
        { id: admin.id, email: admin.email, role: 'admin' },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      return res.json({
        success: true,
        message: "Admin login successful ✅",
        token: token,
        user: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: 'admin'
        }
      });
    }

    // Admin nahi mila to users table mein check karo
    const userSql = "SELECT * FROM users WHERE email = ?";
    db.query(userSql, [email], async (err, userResults) => {
      if (err) {
        return res.status(500).json({ success: false, error: "Database error" });
      }

      if (userResults.length === 0) {
        return res.status(401).json({ success: false, message: "Invalid email or password ❌" });
      }

      const user = userResults[0];
      
      // Password match karo
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid email or password ❌" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: 'user' },
        SECRET_KEY,
        { expiresIn: "7d" }
      );

      res.json({
        success: true,
        message: "Login successful ✅",
        token: token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: 'user'
        }
      });
    });
  });
});

// ✅ GOOGLE SIGNIN API - FIXED VERSION
router.post("/google", async (req, res) => {
  console.log("🔵 Google route hit!");
  console.log("Request body:", req.body);
  
  try {
    const { credential } = req.body;
    
    if (!credential) {
      console.error("❌ No credential provided");
      return res.status(400).json({ success: false, error: "No credential provided" });
    }

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: GOOGLE_CLIENT_ID
    });
    
    const payload = ticket.getPayload();
    console.log("✅ Google payload:", { email: payload.email, name: payload.name });
    
    const { email, name, sub: googleId, picture } = payload;

    // Check if user exists
    const checkSql = "SELECT * FROM users WHERE email = ?";
    db.query(checkSql, [email], (err, results) => {
      if (err) {
        console.error("❌ Database error:", err);
        return res.status(500).json({ success: false, error: "Database error" });
      }

      let user;
      if (results.length > 0) {
        // User exists
        user = results[0];
        console.log("📝 Existing user found:", user.id);
        
        // Update google_id if not set
        if (!user.google_id) {
          const updateSql = "UPDATE users SET google_id = ?, avatar = ? WHERE id = ?";
          db.query(updateSql, [googleId, picture, user.id], (err) => {
            if (err) console.error("Update error:", err);
          });
        }
      } else {
        // Create new user
        console.log("🆕 Creating new user:", email);
        const insertSql = "INSERT INTO users (name, email, google_id, avatar, provider) VALUES (?, ?, ?, ?, 'google')";
        db.query(insertSql, [name, email, googleId, picture], (err, result) => {
          if (err) {
            console.error("❌ Insert error:", err);
            return res.status(500).json({ success: false, error: "Database error" });
          }
          user = { id: result.insertId, name, email, avatar: picture };
          console.log("✅ New user created with ID:", result.insertId);
        });
      }

      // Wait a moment for async operations to complete
      setTimeout(() => {
        const token = jwt.sign(
          { id: user.id, email: user.email, role: 'user' },
          SECRET_KEY,
          { expiresIn: "7d" }
        );

        res.json({
          success: true,
          message: "Google authentication successful!",
          token: token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: picture || user.avatar
          }
        });
      }, 100);
    });
    
  } catch (error) {
    console.error("❌ Google auth error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Google authentication failed",
      details: error.message 
    });
  }
});

// ✅ GET USER PROFILE
router.get("/profile", (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    
    const sql = "SELECT id, name, email, phone, avatar, provider, created_at FROM users WHERE id = ?";
    db.query(sql, [decoded.id], (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, error: "Database error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ success: false, error: "User not found" });
      }

      res.json({
        success: true,
        user: results[0]
      });
    });
  } catch (error) {
    return res.status(401).json({ success: false, error: "Invalid token" });
  }
});

module.exports = router;