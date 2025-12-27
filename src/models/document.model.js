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

module.exports = {
  createDocument,
  getUserDocuments,
};
