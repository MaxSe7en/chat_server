import { query, selectAll } from "../utils/dbUtils.js";
import logger from "../utils/logger.js";
import dotenv from "dotenv";

dotenv.config();

export const testAgent = async (userId) => {
  const sql = 'SELECT agent_id, uid, team_members FROM agent_test WHERE uid = ?';
  const data = await selectAll(sql, [userId]);
  
  if (data.length > 0) {
    return data[0];
  } else {
    return { message: 'Resource not found' };
  }
};

export const testUsers = async (userId) => {
  const sql = 'SELECT username FROM users WHERE uid = ?';
  const data = await Helper.selectAll(sql, [userId]);
  
  if (data.length > 0) {
    return data[0];
  } else {
    return { message: 'Resource not found' };
  }
}

// export default {
//   testAgent,
//   testUsers
// }