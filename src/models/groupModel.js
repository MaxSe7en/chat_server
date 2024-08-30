// import { rearrangeData } from "../helpers/groupChatMessageHelpers.js";
import { query } from "../utils/dbUtils.js";
import groupChatMessageHelpers from "../helpers/groupChatMessageHelpers.js";
import logger from "../utils/logger.js";
async function createGroup(agent_name, group_name, generate_group_id) {
  try {
    let username_group = agent_name + group_name;
    console.log("username group: " + username_group);
    const sql =
      "INSERT INTO chat_groups (agent_name,group_id,group_name,username_group) VALUES (?,?,?,?)";
    await query(sql, [
      agent_name,
      generate_group_id,
      group_name,
      username_group,
    ]);
    return { success: true, groupId: generate_group_id, type: "group" };
  } catch (error) {
    // console.log(error);
    logger.error("Error creating a group", error);
    return { success: false, message: error, type: "group" };
  }
}

async function fetchGroupAndMembersByAgentName(agentName) {
  try {
    const sql = `
            WITH relevant_groups AS (
    SELECT g.group_id, g.announcement
    FROM chat_groups g
    JOIN members m ON g.group_id = m.group_id
    WHERE g.agent_name = ?
       OR m.user_name = ?
)

SELECT 
    g.group_id, 
    g.group_name, 
    g.agent_name,
    g.announcement,
    m.user_name,
    m.member_id,
    m.role
FROM 
    members m
JOIN 
    chat_groups g ON m.group_id = g.group_id
WHERE 
    g.agent_name = ?
   OR m.user_name = ?
   OR g.group_id IN (SELECT group_id FROM relevant_groups)
   AND g.agent_name <> ?;
    `;

    const results = await query(sql, [
      agentName,
      agentName,
      agentName,
      agentName,
      agentName,
    ]);

    // if (results.length === 0) {
    //   throw new Error("No group or members found for the provided agent name");
    // }

    // console.log("seeeee ", results);

    return groupChatMessageHelpers.rearrangeData(results);
  } catch (error) {
    console.error("Error fetching group and members:", error);
    logger.error("Error fetching group and members", error);
  }
}

async function updateGroupAnnouncement(announcement, group_id) {
  try {
    const sql = "UPDATE chat_groups SET announcement = ? WHERE group_id = ?";
    await query(sql, [announcement, group_id]);
    return { success: true, message: "Announcement updated successfully" };
  } catch (error) {
    console.error("Error updating group announcement", error);
    logger.error("Updating group announcement", error);
    return { success: false, message: "Failed to update group announcement" };
  }
}
async function updateGroupName(group_name, group_id) {
  try {
    const sql = "UPDATE chat_groups SET group_name = ? WHERE group_id = ?";
    await query(sql, [group_name, group_id]);
    return { success: true, message: "Group name updated successfully" };
  } catch (error) {
    console.error("Error updating group name:", error);
    logger.error("Error updating group name", error);
    return { success: false, message: "Failed to update group name" };
  }
}

async function disbandGroup(group_id) {
  try {
    const sql = "DELETE FROM chat_groups WHERE group_id = ?";
    await query(sql, [group_id]);
    return { success: true, message: "Group disbaneded successfully" };
  } catch (error) {
    console.error("Error disbanding group", error);
    logger.error("Error disbanding group", error);
    return { success: false, message: "Failed to disband group" };
  }
}

async function updateGroupMembersRole(newRole, users, group_id) {
  try {
    // Create a string of placeholders for the number of users
    const placeholders = users.map(() => "?").join(", ");

    // Construct the SQL query
    const sql = `UPDATE members SET role = ? WHERE group_id = ? AND user_name IN (${placeholders})`;

    // Combine parameters into a single array
    const params = [newRole, group_id, ...users];

    // Execute the query
    await query(sql, params);

    return { success: true, message: "Roles updated successfully" };
  } catch (error) {
    console.error("Error updating roles", error);
    logger.error("Error disbanding roles", error);
    return { success: false, message: "Failed to update roles" };
  }
}
async function deleteGroupMember(member_id, group_id) {
  try {
    // Construct the SQL query
    const sql = `DELETE FROM members WHERE group_id = ? AND member_id = ?`;

    // Execute the query
    let results = await query(sql, [group_id, member_id]);

    console.log(results.affectedRows);

    if (results.affectedRows) {
      return { success: true, message: "Member deleted successfully" };
    } else {
      return { success: false, message: "Member does not exist" };
    }
  } catch (error) {
    console.error("Error updating roles", error);
    logger.error("Error disbanding roles", error);
    return { success: false, message: "Failed to update roles" };
  }
}

async function inviteGroupMembers(user_name, group_name, group_id) {
  try {
    console.log("username group: " + user_name, group_name, group_id);

    // Check if the user is already a member of the group
    const checkSql =
      "SELECT * FROM members WHERE group_id = ? AND user_name = ?";
    const existingMembers = await query(checkSql, [group_id, user_name]);

    if (existingMembers.length > 0) {
      return {
        success: false,
        message: "User is already a member of the group",
      };
    }

    // If the user is not a member, proceed with the insertion
    const sql =
      "INSERT INTO members (group_id,group_name,user_name) VALUES (?,?,?)";
    await query(sql, [group_id, group_name, user_name]);

    return { success: true, message: "Member invited successfully" };
  } catch (error) {
    // console.log(error);
    logger.error("Error inviting a member to the group", error);
    return { success: false, message: error, type: "group" };
  }
}
async function fetchGroupMembers(group_id) {
  try {
    console.log("username group: " + group_id);

    const sql = "SELECT user_name FROM members WHERE group_id =  ?";
    let results = await query(sql, [group_id]);

    return { success: true, message: "Member fetched successfully", results };
  } catch (error) {
    // console.log(error);
    logger.error("Error inviting a member to the group", error);
    return { success: false, message: error, type: "group" };
  }
}

export default {
  updateGroupAnnouncement,
  fetchGroupAndMembersByAgentName,
  createGroup,
  updateGroupName,
  disbandGroup,
  updateGroupMembersRole,
  deleteGroupMember,
  inviteGroupMembers,
  fetchGroupMembers,
};
