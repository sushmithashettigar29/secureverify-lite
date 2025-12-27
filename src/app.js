const express = require("express");
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const documentRoutes = require("./routes/document.routes");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "SecureVerify Lite server is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/documents", documentRoutes);

module.exports = app;
