import pool from "../config/db.js";

export async function query(sql, params) {
  return await pool.query(sql, params);
}

export const selectAll = async (sql, params) => {
  const [rows] = await pool.query(sql, params);
  return rows;
};