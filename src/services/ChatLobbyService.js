import logger from "../utils/logger.js";

const handleChatLobbyService = (io, socket) => {
  // Listen for the "sendOpenChatMessage" event on the socket
  socket.on("chatLobbyData", async (data) => {
    try {
      console.log("Sendxxxxxxxxxxxxxx ", data);

      // // Emit the "receiveOpenChatMessage" event to all connected clients with the new message data
      io.emit("chatLobbyData", {});
    } catch (error) {
      logger.error("Error send open chat message event", error);
    }
  });
};

// Export the function for use in other parts of the application
export default handleChatLobbyService;
