import logger from "../utils/logger.js";
import redisClient from "../utils/redisClient.js";
function groupByGroupName(data) {
  const grouped = [];

  // Create a map to track groups by group_name
  const groupMap = {};

  try {
    data.forEach((item) => {
      // Check if the group_name already exists in the map
      if (!groupMap[item.group_name]) {
        // If not, create a new group and push it to the grouped array
        groupMap[item.group_name] = [];
        grouped.push(groupMap[item.group_name]);
      }
      // Add the current item to the appropriate group
      groupMap[item.group_name].push(item);
    });

    return grouped;
  } catch (error) {
    console.error("Error grouping data by group name ", error); // Log error to console
    logger.error("Error grouping data by group name ", error); // Log error to logger
  }
}

function rearrangeData(data) {
  try {
    const groupedData = data.reduce((acc, item) => {
      // Check if the group name already exists in the accumulator
      if (!acc[item.group_name]) {
        // If not, create a new object for that group name
        acc[item.group_name] = {
          agent_name: item.agent_name,
          group_name: item.group_name,
          group_id: item.group_id,
          announcement: item.announcement,
          members: [],
          // Profiling edit inline edit explain sql create php code refresh
          messages: [
            // {
            //   type: "group_chat",
            //   senderId: "Kpanti",
            //   recipientId: "Theboy",
            //   message: "hhhhhh",
            //   status: "success",
            //   time: "14:49:52",
            //   date: "17-7-2024",
            // },
          ],
        };
      }
      // Add the current item's member info to the members array
      acc[item.group_name].members.push({
        user_name: item.user_name,
        member_id: item.member_id,
        role: item.role,
      });
      return acc;
    }, {});

    // Transform the grouped data object into an array
    return Object.values(groupedData);
  } catch (error) {
    console.error("Error rearranging data ", error); // Log error to console
    logger.error("Error rearranging data ", error); // Log error to logger
  }
}

const saveGroupChatMessage = async (data) => {
  console.log("saveMessagegroup ", data); // Log the message data

  // Push the message data to the 'messages' list in Redis
  try {
    await redisClient.lPush(data.recipientId, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving group chat message to the redis server", error); // Log error to console
    logger.error("Error saving group chat message to the redis server", error); // Log error to logger
  }
};

async function getGroupChatMessagesHelper(group_id) {
  console.log("getGroupChatMessages", group_id);

  try {
    // Get all messages from the 'messages' list in Redis
    let messages = await redisClient.lRange(group_id, 0, -1);

    // return "let see how it works";
    return messages; // Return the retrieved messages
  } catch (error) {
    console.error(
      "Error fetching group chat messages from the reidis server",
      error
    ); // Log error to console
    logger.error(
      "Error fetching group chat messages from the reidis server",
      error
    ); // Log error to loggerr
  }
}
export default {
  groupByGroupName,
  rearrangeData,
  getGroupChatMessagesHelper,
  saveGroupChatMessage,
};
