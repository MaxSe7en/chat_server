// Import helper functions for handling messages
import openChatMessageHelper from "../helpers/openChatMessageHelper.js";
import { getDate } from "../utils/getDate.js";
// Import utility function to get formatted time
import { getTime } from "../utils/getTime.js";
import logger from "../utils/logger.js";

// Function to handle open chat service using Socket.IO
const handleOpenChatService = (io, socket) => {
  // Listen for the "sendOpenChatMessage" event on the socket
  socket.on("sendOpenChatMessage", async (data) => {
    try {
      const { user, message, receipient } = data; // Extract user, message, and recipient from the incoming data
      // const newData = { user, message, receipient, timestamp: Date.now() }; // Create a new message object with the current timestamp
      const timestamp = Date.now();
      const dataToBeSent = {
        user,
        message,
        time: getTime(timestamp), //
        date: getDate(timestamp), //
        receipient,
      };

      // Save the new message to the message storage
      await openChatMessageHelper.saveOpenChatMessage(dataToBeSent);
      // Emit the "receiveOpenChatMessage" event to all connected clients with the new message data
      io.emit("receiveOpenChatMessage", dataToBeSent);
    } catch (error) {
      logger.error("Error send open chat message event", error);
    }
  });
};

// Export the function for use in other parts of the application
export default handleOpenChatService;
