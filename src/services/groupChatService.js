import groupModel from "../models/groupModel.js";
import { createMembers } from "../models/memberModel.js";
import { getDate } from "../utils/getDate.js";
import { getTime } from "../utils/getTime.js";
import redisClient from "../utils/redisClient.js";
import groupChatMessageHelper from "../helpers/groupChatMessageHelpers.js";
import logger from "../utils/logger.js";

export async function createGroupAndMember(
  group_name,
  members,
  generate_group_id,
  agent_name
) {
  try {
    const response = await groupModel.createGroup(
      agent_name,
      group_name,
      generate_group_id
    );

    console.log("----->xx ", response);

    if (response.success) {
      console.log("Group created successfully");
      const memberResult = await createMembers(
        response.groupId,
        members,
        group_name
      );

      console.log("membersResults", memberResult);

      return response;
    } else {
      return response;
    }
  } catch (error) {
    console.error("Error creating group and members", error);
    logger.error("Error creating a group and members", error);
  }
}

export async function getGroupAndMembersByAgentName(agentName) {
  try {
    const group = await groupModel.fetchGroupAndMembersByAgentName(agentName);
    // console.log("groupAndMembers----> ", group);
    return group;
  } catch (error) {
    console.error("Error fetching group and members by agent name", error);
    logger.error("Error fetching group and members by agent name", error);

    // return { success: false, message: "Failed to fetch group and members" };
    return [
      {
        group_name: null,
        group_id: null,
        members: [],
        messages: [],
      },
    ];
  }
}

export async function handleGroupChatService(io, socket) {
  socket.on("joinGroup", ({ userId, groupId }) => {
    try {
      const groupKey = `group_${groupId}`;
      console.log(
        `user ${userId} with group id ${groupId} joined with socket id: ${socket.id}`
      );
      // redisClient.sadd
      // Add user to the group in Redis
      socket.join(groupKey);
    } catch (error) {
      logger.error("Error in joinGroup event", error);
    }
  });

  socket.on("groupChatMessage", async (data) => {
    try {
      // if (!socket.groupId) {
      //   console.log(`User is offline`);
      // }
      const { recipientId, message, messageId, senderId, type } = data;
      console.log("datavvvvvvvvvvv ", data);
      const timestamp = Date.now();
      const dataToBeSent = {
        type,
        senderId,
        recipientId,
        message,
        status: "success",
        time: getTime(timestamp), //
        date: getDate(timestamp), //
        timestamp,
      };

      // save the message in the redis server
      await groupChatMessageHelper.saveGroupChatMessage(dataToBeSent);

      const groupKey = `group_${recipientId}`;

      console.log("group key ", groupKey);

      // console.log(`${recipientId} ${message.toString()}`);
      // try {
      io.to(groupKey).emit("groupChatMessage", {
        ...dataToBeSent,
        status: "success",
        messageId,
      });

      //

      // io.to(groupKey).emit("unReadMessages", dataToBeSent.recipientId);

      //adding chat to chat list

      let uniqueChatListKey = `ChatList|${dataToBeSent.senderId}`;
      await redisClient.hSet(
        uniqueChatListKey,
        dataToBeSent.recipientId,
        Date.now()
      );

      let members = await groupModel.fetchGroupMembers(recipientId);

      console.log("results in group chat service", members);
      [...members.results, { user_name: "roodev" }].forEach(
        async ({ user_name }) => {
          console.log(user_name);
          const recipientSocketId = await redisClient.get(user_name);
          console.log("---> ", { recipientSocketId, senderId, recipientId });
          io.to(recipientSocketId).emit("unReadMessages", {
            senderId,
            recipientId,
            type: "group",
          });
          if (true) {
          }
        }
      );
      // socket.emit("chatList", { recipientId: dataToBeSent.recipientId });

      console.log("Sent message.....................................");
      // } catch (err) {
      //   console.error("Redis get error:", err);
      // }
    } catch (error) {
      logger.error("Error in groupChatMessage event", error);
    }
  });

  socket.on("disconnect", () => {
    try {
      if (socket.userId) {
        redisClient.del(socket.userId);
      }
      console.log("group chat disconnected:", socket.id);
    } catch (error) {
      logger.info("Error in disconnect event", error);
    }
  });
}
