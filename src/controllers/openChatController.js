// Import helper functions for handling messages
import openChatMessageHelper from "../helpers/openChatMessageHelper.js";
import logger from "../utils/logger.js";

// Controller function to handle fetching open chat messages
const getOpenChatMessagesController = async (req, res) => {
  try {
    // Retrieve open chat messages using the messageHelper
    const messages = await openChatMessageHelper.getOpenChatMessages();

    // Map over each message and transform it to include user, message, time, and recipient
    const results = messages.map((message) => {
      let messagex = JSON.parse(message); // Parse the message from JSON format
      // console.log(messagex);
      return {
        user: messagex.user,
        message: messagex.message,
        time: messagex.time, // Get formatted time from timestamp
        date: messagex.date, // Get formatted date from timestamp
        receipient: messagex.receipient,
      };
    });
    res.status(200).json(results.reverse()); // Send the messages in reverse order as JSON
  } catch (error) {
    console.log("Error fetching open chat messages ", error); // Log error to console
    logger.error("Error fetching open chat messages ", error); // Log error to logger
    res.status(500).send("Error fetching open chat messages"); // Send error response on failure
  }
};

// Export the controller functions as default
export default {
  getOpenChatMessagesController,
};
