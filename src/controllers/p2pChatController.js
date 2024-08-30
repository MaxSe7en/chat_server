// Import helper functions for handling messages
import p2pChatMessageHelper from "../helpers/p2pChatMessageHelper.js";
import logger from "../utils/logger.js";
// import openChatMessageHelper from "../helpers/p2pChatMessageHelper";

// Controller function to handle fetching open chat messages
const getP2pMessageController = async (req, res) => {
  try {
    const { senderId, recipientId } = req.body;
    // Retrieve open chat messages using the messageHelper
    const messages = await p2pChatMessageHelper.getP2pChatMessages(
      senderId,
      recipientId
    );
    const results = messages.map((message) => JSON.parse(message));

    res.send(results.reverse());
    // Map over each message and transform it to include user, message, time, and recipient
    // Send the messages in reverse order as JSON
  } catch (error) {
    console.error("Error fetching p2p chat messages ", error); // Log error to console
    logger.error("Error fetching p2p chat messages ", error); // Log error to logger
    res.status(500).send("Error fetching p2p chat messages"); // Send error response on failure
  }
};

// Export the controller functions as default
export default {
  getP2pMessageController,
};
