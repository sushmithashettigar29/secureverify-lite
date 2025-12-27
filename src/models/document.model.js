const { pool } = require("../config/db");

const createDocument = async (userId, fileName, filePath, fileHash) => {
  const query = `
    INSERT INTO documents (user_id, file_name, file_path, file_hash, status)
    VALUES ($1, $2, $3, $4, 'SUBMITTED')
    RETURNING *
  `;
  const values = [userId, fileName, filePath, fileHash];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getUserDocuments = async (userId) => {
  const query = `SELECT * FROM documents WHERE user_id = $1`;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

const getDocumentById = async (docId) => {
  const result = await pool.query("SELECT * FROM documents WHERE id = $1", [
    docId,
  ]);
  return result.rows[0];
};

const updateDocumentStatus = async (docId, status) => {
  const result = await pool.query(
    "UPDATE documents SET status = $1 WHERE id = $2 RETURNING *",
    [status, docId]
  );
  return result.rows[0];
};

module.exports = {
  createDocument,
  getUserDocuments,
  getDocumentById,
  updateDocumentStatus,
};
