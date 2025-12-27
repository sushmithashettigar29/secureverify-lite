const { pool } = require("../config/db");

const createAuditLog = async (action, userId, documentId = null) => {
  const query = `
    INSERT INTO audit_logs (action, user_id, document_id)
    VALUES ($1, $2, $3)
  `;
  await pool.query(query, [action, userId, documentId]);
};

module.exports = {
  createAuditLog,
};
