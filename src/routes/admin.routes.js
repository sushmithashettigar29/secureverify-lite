const express = require("express");
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/rbac.middleware");
const { getAuditLogs } = require("../controllers/admin.controller");

const router = express.Router();

router.get("/dashboard", authenticate, authorize("ADMIN"), (req, res) => {
  res.status(200).json({
    message: "Welcome to admin dashboard",
    user: req.user,
  });
});

router.get("/audit-logs", authenticate, authorize("ADMIN"), getAuditLogs);

module.exports = router;
