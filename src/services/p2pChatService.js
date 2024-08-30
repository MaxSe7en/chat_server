import { getDate } from "../utils/getDate.js";
import { getTime } from "../utils/getTime.js";
import redisClient from "../utils/redisClient.js";
import saveP2pChatMessage from "../helpers/p2pChatMessageHelper.js";
import p2pChatMessageHelper from "../helpers/p2pChatMessageHelper.js";
import logger from "../utils/logger.js";

const handleP2PChatService = (io, socket) => {
  socket.on("joinP2P", async (userId) => {
    try {
      socket.userId = userId;
      await redisClient.set(userId, socket.id);
      console.log(`${userId} joined with socket id: ${socket.id}`);
    } catch (error) {
      logger.error("Error in joinP2P event", error);
    }
  });

  // socket.on("Unread",aysnc()=>{

  // })
  socket.on("P2PMessage", async (data) => {
    try {
      if (!socket.userId) {
        // socket.emit("unReadMessages","dataToBeSent.senderId");

        console.log(`User is offline`);
      }
      const { recipientId, message, messageId, senderId, type } = data;
      console.log("datavvvvvvvvvvv ", data);
      const timestamp = Date.now();
      const dataToBeSent = {
        type,
        senderId,
        recipientId,
        message,
        status: "success",
        time: getTime(timestamp), //
        date: getDate(timestamp), //
        timestamp,
      };

      // save the message in the redis server
      await p2pChatMessageHelper.saveP2pChatMessage(dataToBeSent);

      setTimeout(() => {
        //send the message to back to the sender
        io.to(socket.id).emit("P2PMessage", {
          ...dataToBeSent,
          status: "success",
          messageId: messageId,
        });
      }, 3000);

      console.log(`${recipientId} ${message.toString()}`);
      const recipientSocketId = await redisClient.get(recipientId);
      if (recipientSocketId) {
        console.log("Recipient socket ID:", {
          ...dataToBeSent,
          status: "success",
          messageId: messageId,
        });

        io.to(recipientSocketId).emit("P2PMessage", {
          ...dataToBeSent,
          status: "success",  
          messageId,
        });

        io.to(recipientSocketId).emit("unReadMessages", {
          senderId: data.senderId,
          recipientId: data.recipientId,
          type:"P2P"
        });

        console.log(
          `Message from ${senderId} to ${recipientId} (socket id: ${recipientSocketId}): ${message}`
        );
      } else {
        console.log(`Recipient ID ${recipientId} not found`);
      }

      //unread messages

      //adding chat to chat list

      let uniqueChatListKey = `ChatList|${dataToBeSent.senderId}`;
      console.log(
        "uniqueChatListKey------> ",
        uniqueChatListKey,
        dataToBeSent.senderId,
        dataToBeSent.recipientId
      );
      await redisClient.hSet(
        uniqueChatListKey,
        dataToBeSent.recipientId,
        Date.now()
      );
      // socket.emit("chatList", { recipientId: dataToBeSent.recipientId });
    } catch (err) {
      console.error("Error in P2PMessage event ", err);
      logger.error("Error in P2PMessage event ", err);
    }
  });

  // socket.on("disconnectUser", () => {
  //   console.log(`Disconnecting user with socket id: ${socket.id}`);
  //   socket.disconnect(true); // Disconnect the specific socket
  // });

  socket.on("disconnect", () => {
    try {
      if (socket.userId) {
        redisClient.del(socket.userId);
      }
      console.log("p2p chat disconnet", socket.id);
    } catch (error) {
      logger.error("Error in disconnect event", error);
    }
  });
};

export default handleP2PChatService;
