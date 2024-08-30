// Import the necessary modules
import express from "express";
import https from "https";
import fs from  "fs";
import config from "./config/index.js";
import chatRoutes from "./routes/chatRoute.js";
import socketService from "./services/socketService.js";
import cors from "cors";
import logger from "./utils/logger.js";

// Create an instance of an Express application
const app = express();

// Create an HTTP server using the Express application
const server = https
.createServer(
  {
    key: fs.readFileSync(
      "/etc/letsencrypt/live/easyopen1573.com/privkey.pem"
    ),
    cert: fs.readFileSync(
      "/etc/letsencrypt/live/easyopen1573.com/fullchain.pem"
    ),
  },
  app
)
.listen(config.port, function () {
  console.log(`Server started on port ${config.port}`);
  logger.info(`HTTPS Server running on port ${config.port}`);
});


// Configure CORS to allow requests from the frontend
const corsOptions = {
  origin: "*", // TODO: Update this to your frontend URL for better security
  methods: "*", // Allow only GET and POST methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow only Content-Type header
};

// Apply CORS middleware with the specified options
app.use(cors(corsOptions));
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// Middleware to parse JSON requests
app.use(express.json());

// Define the route for chat-related API endpoints
app.use("/api/chat", chatRoutes);
// app.use("/", (req, res, next) => res.send("dsfsf"));

//
app.get("/", (req, res) => res.send("CHAT SERVER"));

app.all("*", (req, res) => res.send("NOT FOUND"));


// Initialize the socket service with the created server
socketService.initSocket(server);

// Start the server and listen on the configured port
// server.listen(config.port, () => {
//   console.log(`Server is running on port ${config.port}`);
//   logger.info(`Server is running on port ${config.port}`);
// });
