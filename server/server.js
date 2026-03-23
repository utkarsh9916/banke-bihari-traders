require('dotenv').config(); // Add this at the VERY TOP
console.log("✅ Environment variables loaded");
console.log("EMAIL_USER:", process.env.EMAIL_USER ? "✅ Set" : "❌ Missing");
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "✅ Set" : "❌ Missing");

const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const testRoutes = require("./routes/testRoutes");
const leadsRoutes = require("./routes/leadsRoutes");
const authRoutes = require("./routes/authRoutes"); // 👈 Ek baar hi import karo
const storeRoutes = require("./routes/storeRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
// const contactRoutes = require("./routes/contactroutes");
const wholesaleRoutes = require("./routes/wholesaleRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", testRoutes);
app.use("/api", leadsRoutes);
app.use("/api/auth", authRoutes);      // 👈 Yeh already /api/auth routes handle karega
app.use("/api", storeRoutes);
app.use("/api", categoryRoutes);
app.use("/api", bannerRoutes);
app.use("/api", galleryRoutes);
// app.use("/api", contactroutes)
app.use("/api", wholesaleRoutes);
// app.use("/api/auth", authRoutes); // 👈 YEH LINE HATA DO (duplicate hai)

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});