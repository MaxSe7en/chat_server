import groupChatMessageHelpers from "../helpers/groupChatMessageHelpers.js";
import groupModel from "../models/groupModel.js";
import redisClient from "../utils/redisClient.js";
import { createGroupAndMember } from "../services/groupChatService.js";
import { generateNumericUUID } from "../utils/generateUid.js";
import logger from "../utils/logger.js";

async function createGroupAndMemberController(req, res) {
  const { group_name, members, agent_name } = req.body;

  console.log(`createGroupAndMember ${group_name} ${JSON.stringify(members)}`);

  const generate_group_id = generateNumericUUID();

  try {
    if (members.length === 0)
      return res
        .status(404)
        .json("{ message: You need to add at least one member }");
    const result = await createGroupAndMember(
      group_name,
      members,
      generate_group_id,
      agent_name
    );

    if (!result.success) {
      return res.status(400).json({ message: result.message.sqlMessage });
    }
    return res
      .status(200)
      .json({ message: "Group created successfully", groupId: result.groupId });
  } catch (error) {
    console.log(error);
    logger.error("Error creating group and membe", error); // Log error to logger
    res.status(500).json({ message: "Error creating group and member", error });
  }
}

async function fetchGroupMessagesController(req, res) {
  const { group_id } = req.params;
  try {
    const messages = await groupChatMessageHelpers.getGroupChatMessagesHelper(
      group_id
    );

    const results = messages.map((message) => JSON.parse(message));

    res.status(200).json(results.reverse());
  } catch (error) {
    console.log("get group messages error ", error);
    logger.error("Error fetching group messages", error); // Log error to logger
    res.status(500).send("Error fetching group messages");
  }
}

async function setGroupAnnoucementController(req, res) {
  const { group_id, announcement } = req.body;
  try {
    let results = await groupModel.updateGroupAnnouncement(
      announcement,
      group_id
    );
    res.send(results);
  } catch (error) {
    console.log("set group annoucement error ", error);
    logger.error("Error setting group annoucement", error); // Log error to logger
    res.status(500).send("Error setting group annoucement");
  }
}

async function setGroupNameController(req, res) {
  const { group_id, group_name } = req.body;

  try {
    let results = await groupModel.updateGroupName(group_name, group_id);
    res.send(results);
  } catch (error) {
    console.log("set group name error ", error);
    logger.error("Error setting group name", error); // Log error to logger
    res.status(500).send("Error setting group name");
  }
}

async function disBandGroupController(req, res) {
  const { group_id } = req.params;
  const { username } = req.body;
  try {
    let key = `ChatList|${username}`;
    let results = await groupModel.disbandGroup(group_id);
    await redisClient.hDel(key, group_id);
    res.send(results);
  } catch (error) {
    console.log("disband group error ", error);
    logger.error("Error disbanding group", error); // Log error to logger
    res.status(500).send("Error disbanding group");
  }
}

async function updateGropMembersRoleController(req, res) {
  const { role, members, group_id } = req.body;

  try {
    let results = await groupModel.updateGroupMembersRole(
      role,
      members,
      group_id
    );
    res.send(results);
  } catch (error) {
    console.log("update group members role error ", error);
    logger.error("Error updating group members role", error); // Log error to logger
    res.status(500).send("Error updating group members role");
  }
}
async function deleteGroupMemberController(req, res) {
  const { member_id, group_id } = req.body;

  try {
    let results = await groupModel.deleteGroupMember(member_id, group_id);
    console.log(results);
    res.status(200).json(results);
  } catch (error) {
    console.log("Error deleting group membe ", error);
    logger.error("Error deleting group member", error); // Log error to logger
    res.status(500).send("Error deleting group member");
  }
}

async function inviteGroupMember(req, res) {
  const { user_name, group_name, group_id } = req.body;

  try {
    let results = await groupModel.inviteGroupMembers(
      user_name,
      group_name,
      group_id
    );
    // console.log(results);
    res.status(201).json(results);
  } catch (error) {
    console.log("Error adding a group member ", error);
    logger.error("Error adding a group member", error); // Log error to logger
    res.status(500).send("Error adding a group member");
  }
}

export default {
  createGroupAndMemberController,
  fetchGroupMessagesController,
  setGroupAnnoucementController,
  setGroupNameController,
  disBandGroupController,
  updateGropMembersRoleController,
  deleteGroupMemberController,
  inviteGroupMember,
};
