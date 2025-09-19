import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,   // limit connections (adjust as needed)
  queueLimit: 0
});

// Test the connection
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log(`✅ Connected to MySQL database: ${process.env.DB_NAME}`);
    connection.release();
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
})();

export default pool;
