import logger from "../utils/logger.js";
import redisClient from "../utils/redisClient.js";

const fetchChatListData = async (username) => {
  // return;
  try {
    let uniqueChatListKey = `ChatList|${username}`;

    let chatListData = await redisClient.hGetAll(
        uniqueChatListKey,
      0,
      -1
    );

    return chatListData;
  } catch (error) {
    console.error("fetch chat list data helper ", error); // Log error to console
    logger.error("fetch chat list data helper ", error); // Log error to logger
  }
};

export default {
  fetchChatListData,
};
