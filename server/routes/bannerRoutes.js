const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ADD BANNER
router.post("/banners", (req, res) => {
  const { title, image, link } = req.body;

  const sql = "INSERT INTO banners (title, image, link) VALUES (?, ?, ?)";

  db.query(sql, [title, image, link], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json({ message: "Banner added successfully ✅" });
    }
  });
});

// GET ALL BANNERS
router.get("/banners", (req, res) => {
  const sql = "SELECT * FROM banners";

  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;