import logger from "../utils/logger.js";
import lastSeenHelper from "../helpers/lastSeenHelper.js";

// Controller function to handle fetching open chat messages
const lastSeenController = async (req, res) => {
  const data = req.body;
  try {
    await lastSeenHelper.saveLastSeenHelper(data);

    res.status(201).json({ message: "Last seen saved successfully" });
  } catch (error) {
    console.log("Error fetching last seen ", error); // Log error to console
    logger.error("Error fetching last seen ", error); // Log error to logger
    res.status(500).send("Error fetching last seen"); // Send error response on failure
  }
};

// Export the controller functions as default
export default {
  lastSeenController,
};
