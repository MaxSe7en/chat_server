// Import the dotenv module to load environment variables from a .env file into process.env
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

// Define the configuration object
const config = {
  // Set the port from environment variables, default to 800 if not set
  port: process.env.PORT || 800,

  // Set the Redis URL from environment variables, default to a specific IP address if not set
  redisUrl: process.env.REDIS_URL || "redis://localhost:6379",
};

// Export the configuration object for use in other parts of the application
export default config;
