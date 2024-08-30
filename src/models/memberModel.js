import { query } from "../utils/dbUtils.js";
import logger from "../utils/logger.js";

export async function createMembers(groupId, members, group_name) {
  try {
    // Create the SQL for insertion
    const insertSql =
      "INSERT INTO members (group_id, user_name, group_name) VALUES ";

    // Create the placeholders for each member
    const placeholders = members.map(() => "(?, ?, ?)").join(", ");

    // Flatten the array of member details for the query parameters
    const values = [];
    members.forEach((member) => {
      //   const groupId_username = groupId + member.user_name;
      values.push(groupId, member.user_name, group_name);
    });

    const finalQuery = insertSql + placeholders;
    console.log(finalQuery);
    await query(finalQuery, values);

    return { success: true, message: "Members inserted successfully" };
  } catch (error) {
    console.error("Error inserting members:", error);
    logger.error("Error inserting members", error);
    return { success: false, message: "Failed to insert members" };
  }
}

export async function fetchMembersByUsername(userName) {
  try {
    const sql = "SELECT * FROM members WHERE user_name = ?";
    const members = await query(sql, [userName]);
    return members;
  } catch (error) {
    console.error("Error fetching members by username", error);
    logger.error("Error fetching members by username", error);
  }
}
