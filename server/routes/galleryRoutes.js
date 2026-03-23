const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ADD IMAGE
router.post("/gallery", (req, res) => {
  const { image } = req.body;

  const sql = "INSERT INTO gallery (image) VALUES (?)";

  db.query(sql, [image], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json({ message: "Image added successfully ✅" });
    }
  });
});

// GET GALLERY
router.get("/gallery", (req, res) => {
  const sql = "SELECT * FROM gallery";

  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;