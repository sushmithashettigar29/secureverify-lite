const { pool } = require("../config/db");

const getAuditLogs = async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM audit_logs ORDER BY timestamp DESC"
  );
  res.status(200).json(result.rows);
};

module.exports = {
  getAuditLogs,
};
