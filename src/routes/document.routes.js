const express = require("express");
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/rbac.middleware");
const upload = require("../config/multer");
const {
  uploadDocument,
  getMyDocuments,
  verifyDocument,
} = require("../controllers/document.controller");

const router = express.Router();

router.post("/upload", authenticate, upload.single("document"), uploadDocument);

router.get("/my-documents", authenticate, getMyDocuments);

router.post(
  "/verify",
  authenticate,
  authorize("VERIFIER", "ADMIN"),
  verifyDocument
);

module.exports = router;
