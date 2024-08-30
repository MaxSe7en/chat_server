import messageCountService from "../services/messageCountService.js";
import logger from "../utils/logger.js";

// Controller function to handle fetching open chat messages
const messagesCountController = async (req, res) => {
  const uid = req.params.id;
  try {
    // await lastSeenHelper.saveLastSeenHelper(data);

    let result = await messageCountService.messageCountService(uid);

    console.log("Message Count ", result);

    res.status(201).json({ message: "messages count", result });
  } catch (error) {
    console.log("Error fetching last seen ", error); // Log error to console
    logger.error("Error fetching last seen ", error); // Log error to logger
    res.status(500).send("Error fetching last seen"); // Send error response on failure
  }
};

// Export the controller functions as default
export default {
  messagesCountController,
};
