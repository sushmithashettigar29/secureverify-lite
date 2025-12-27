const uploadHash = require("../utils/hash.util");
const { createDocument, getUserDocuments } = require("../models/document.model");

const uploadDocument = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const filePath = req.file.path;
  const fileHash = uploadHash(filePath);

  const document = await createDocument(
    req.user.userId,
    req.file.originalname,
    filePath,
    fileHash
  );

  res.status(201).json({
    message: "Document uploaded successfully",
    document,
  });
};

const getMyDocuments = async (req, res) => {
  const documents = await getUserDocuments(req.user.userId);
  res.status(200).json(documents);
};

module.exports = {
  uploadDocument,
  getMyDocuments,
};
