import { generateUniqueKeyForSenderAndReceiver } from "../utils/generateUniqueKeyForSenderAndReceiver.js";
import logger from "../utils/logger.js";
import redisClient from "../utils/redisClient.js";

const saveLastSeenHelper = async (data) => {
  console.log("lastSeenController", data);

  // let uniqueChatKey = generateUniqueKeyForSenderAndReceiver(
  //   `lastSeen|${data.sender}|${data.receiver}`
  // );

  let uniqueChatKey = `${data.sender}LastSeen`;
  console.log("uniqueChatKeylastseeeeeeeen ", uniqueChatKey);
  // Push the message data to the 'messages' list in Redis

  // console.log("heyyyyyyyy", isNaN(+data.receiver) ? data.receiver : +data.receiver);
  let value = isNaN(+data.receiver) ? data.receiver : +data.receiver;
  // return;
  try {
    await redisClient.hSet(uniqueChatKey, value, Date.now());
  } catch (error) {
    console.error("last Seen Message Helper", error); // Log error to console
    logger.error("last Seen Message Helper", error); // Log error to logger
  }
};

export default {
  saveLastSeenHelper,
};
