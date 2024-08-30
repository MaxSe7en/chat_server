// Import the Redis client
import logger from "../utils/logger.js";
import redisClient from "../utils/redisClient.js";

// Function to save an open chat message to Redis
const saveOpenChatMessage = async (data) => {
  console.log("saveMessage ", data); // Log the message data

  try {
    // Push the message data to the 'messages' list in Redis
    await redisClient.lPush("openChatMessages", JSON.stringify(data));
  } catch (error) {
    console.error("Error saving open chat message to the redis server", error); // Log error to console
    logger.error("Error saving open chat message to the redis server", error); // Log error to logger
  }
};

// Function to get all open chat messages from Redis
const getOpenChatMessages = async () => {
  try {
    // Get all messages from the 'messages' list in Redis
    let messages = await redisClient.lRange("openChatMessages", 0, -1);
    return messages; // Return the retrieved messages
  } catch (error) {
    console.error(
      "Error fetching group chat message to the redis server",
      error
    ); // Log error to console
    logger.error(
      "Error fetching group chat message to the redis server",
      error
    ); // Log error to logger
  }
};

// Export the functions for use in other parts of the application
export default {
  saveOpenChatMessage,
  getOpenChatMessages,
};
