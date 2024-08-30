import mysql from "mysql2";
import util from "util";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.query = util.promisify(pool.query); // Enable async/await for pool.query

export default pool;
