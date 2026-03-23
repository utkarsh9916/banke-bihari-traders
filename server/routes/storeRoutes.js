const express = require("express");
const router = express.Router();
const db = require("../config/db");
const verifyToken = require("../middleware/authMiddleware");

// ADD STORE (Admin only)
router.post("/stores", verifyToken, (req, res) => {
  const { name, address, phone, map_link } = req.body;

  const sql =
    "INSERT INTO stores (name, address, phone, map_link) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, address, phone, map_link], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json({ message: "Store added successfully ✅" });
    }
  });
});

// GET ALL STORES (Public)
router.get("/stores", (req, res) => {
  const sql = "SELECT * FROM stores";

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;