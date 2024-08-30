// Import the Socket.IO Server class
import { Server as SocketIOServer } from "socket.io";

// Import the open chat service handler
import handleOpenChatService from "./openChatService.js";
import handleP2PChatService from "./p2pChatService.js";
import { handleGroupChatService } from "./groupChatService.js";
import logger from "../utils/logger.js";
import handleChatLobbyService from "./ChatLobbyService.js";

// Function to initialize the Socket.IO server
const initSocket = (server) => {
  // Create a new instance of Socket.IO server with CORS options
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*", // TODO: Update this to your frontend URL for better security
      methods: ["GET", "POST"], // Allow only GET and POST methods
    },
  });

  // Listen for new client connections
  io.on("connection", (socket) => {
    console.log("New client connected ", socket.id); // Log the new client connection

    // Handle open chat messages
    handleOpenChatService(io, socket);

    // Handle P2P chat messages (currently commented out)
    handleP2PChatService(io, socket);

    // handle group chat messages
    handleGroupChatService(io, socket);

    // handle group chat lobby data
    handleChatLobbyService(io, socket);

    // Listen for client disconnections
    socket.on("disconnect", () => {
      console.log("Client disconnected");
      logger.info("Client disconnected");
    });
  });
};

// Export the initSocket function as part of an object
export default {
  initSocket,
};
