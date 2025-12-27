const express = require("express");
const authenticate = require("../middleware/auth.middleware");
const upload = require("../config/multer");
const {
  uploadDocument,
  getMyDocuments,
} = require("../controllers/document.controller");

const router = express.Router();

router.post(
  "/upload",
  authenticate,
  upload.single("document"),
  uploadDocument
);

router.get("/my-documents", authenticate, getMyDocuments);

module.exports = router;
