// Import the redis module
import redis from "redis";
// Import the configuration settings
import config from "../config/index.js";
import logger from "./logger.js";

// Create a new Redis client using the Redis URL from the configuration
const client = redis.createClient({ url: config.redisUrl });

// Listen for error events and log any errors
client.on("error", (err) => {
  console.log("Redis error: ", err);
});

// Connect to Redis when the server starts
client
  .connect()
  .then(() => {
    console.log("Connected to Redis");
    logger.info("Connected to Redis");
  })
  .catch((err) => {
    console.error("Could not connect to Redis:", err);
    logger.error("Could not connect to Redis:", err);
  });
// Export the Redis client for use in other parts of the application
export default client;
