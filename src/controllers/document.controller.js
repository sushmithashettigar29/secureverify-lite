const generateFileHash = require("../utils/hash.util");
const {
  createDocument,
  getUserDocuments,
  getDocumentById,
  updateDocumentStatus,
} = require("../models/document.model");

// Upload document (USER)
const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;
    const fileHash = generateFileHash(filePath);

    const document = await createDocument(
      req.user.userId,
      req.file.originalname,
      filePath,
      fileHash
    );

    return res.status(201).json({
      message: "Document uploaded successfully",
      document,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to upload document",
      error: error.message,
    });
  }
};

// Get documents uploaded by logged-in user
const getMyDocuments = async (req, res) => {
  try {
    const documents = await getUserDocuments(req.user.userId);
    return res.status(200).json(documents);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch documents",
      error: error.message,
    });
  }
};

// Verify or reject document (VERIFIER / ADMIN)
const verifyDocument = async (req, res) => {
  try {
    const { documentId, decision } = req.body;

    if (!documentId || !decision) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const document = await getDocumentById(documentId);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    if (document.status !== "SUBMITTED") {
      return res.status(400).json({ message: "Document already processed" });
    }

    // Recompute hash for tamper detection
    const currentHash = generateFileHash(document.file_path);

    if (currentHash !== document.file_hash) {
      await updateDocumentStatus(documentId, "REJECTED");
      return res.status(400).json({
        message: "Document tampered. Verification failed.",
      });
    }

    if (decision === "VERIFY") {
      const updated = await updateDocumentStatus(documentId, "VERIFIED");
      return res.status(200).json({
        message: "Document verified successfully",
        document: updated,
      });
    }

    if (decision === "REJECT") {
      const updated = await updateDocumentStatus(documentId, "REJECTED");
      return res.status(200).json({
        message: "Document rejected",
        document: updated,
      });
    }

    return res.status(400).json({ message: "Invalid decision" });
  } catch (error) {
    return res.status(500).json({
      message: "Verification failed",
      error: error.message,
    });
  }
};

module.exports = {
  uploadDocument,
  getMyDocuments,
  verifyDocument,
};
