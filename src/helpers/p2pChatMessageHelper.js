// Import the Redis client
import { generateUniqueKeyForSenderAndReceiver } from "../utils/generateUniqueKeyForSenderAndReceiver.js";
import logger from "../utils/logger.js";
import redisClient from "../utils/redisClient.js";

// Function to save an open chat message to Redis
const saveP2pChatMessage = async (data) => {
  // console.log("saveMessage ", data); // Log the message data

  let uniqueChatKey1 = generateUniqueKeyForSenderAndReceiver(
    `${data.senderId}|${data.recipientId}`
  );
  let uniqueChatKey2 = generateUniqueKeyForSenderAndReceiver(
    `${data.recipientId}|${data.senderId}`
  );
  // console.log("uniqueChatKey ", { uniqueChatKey1, uniqueChatKey2 });
  // Push the message data to the 'messages' list in Redis

  try {
    await redisClient.lPush(uniqueChatKey1, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving group p2p message to the redis server", error); // Log error to console
    logger.error("Error saving group p2p message to the redis server", error); // Log error to logger
  }
};

// Function to get all open chat messages from Redis
const getP2pChatMessages = async (senderId, recipientId) => {
  console.log("getP2pChatMessages", senderId, recipientId);
  let uniqueChatKey = generateUniqueKeyForSenderAndReceiver(
    `${senderId}|${recipientId}`
  );

  try {
    // Get all messages from the 'messages' list in Redis
    let messages = await redisClient.lRange(uniqueChatKey, 0, -1);
    return messages; // Return the retrieved messages
    
  } catch (error) {
    console.error("Error fetching p2p chat message to the redis server", error); // Log error to console
    logger.error("Error fetching p2p chat message to the redis server", error); // Log error to logger
  }

};

// Export the functions for use in other parts of the application
export default {
  saveP2pChatMessage,
  getP2pChatMessages,
};
