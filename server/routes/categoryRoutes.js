const express = require("express");
const router = express.Router();
const db = require("../config/db");
const verifyToken = require("../middleware/authMiddleware");

// ADD CATEGORY (ADMIN)
router.post("/categories", verifyToken, (req, res) => {
  const { name, image } = req.body;

  const sql = "INSERT INTO categories (name, image) VALUES (?, ?)";

  db.query(sql, [name, image], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json({ message: "Category added successfully ✅" });
    }
  });
});

// GET ALL CATEGORIES
router.get("/categories", (req, res) => {
  const sql = "SELECT * FROM categories";

  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;