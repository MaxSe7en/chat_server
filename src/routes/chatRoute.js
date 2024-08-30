// Import the express module
import express from "express";
// Import the chat controller functions
import openChatController from "../controllers/openChatController.js";
import chatLobbyController from "../controllers/chatLobbyController.js";
import p2pChatController from "../controllers/p2pChatController.js";
import groupController from "../controllers/groupController.js";
import lastSeenController from "../controllers/lastSeenController.js";
import messagesCountController from "../controllers/messagesCountController.js";
import chatListController from "../controllers/chatListController.js";

const router = express.Router();

// Define a POST route to send an open chat message
// This route uses the sendOpenChatMessageController from the chat controller
// router.post("/openchat/send", chatController.sendOpenChatMessageController);

// Define a GET route to retrieve open chat messages
// This route uses the getOpenChatMessagesController from the chat controller
router.get(
  "/openchat/messages",
  openChatController.getOpenChatMessagesController
);

router.get("/chatlobby/:uid", chatLobbyController.chatLobbyController);

router.post("/p2p/messages", p2pChatController.getP2pMessageController);

router.post("/create/group", groupController.createGroupAndMemberController);

router.get(
  "/group/messages/:group_id",
  groupController.fetchGroupMessagesController
);

router.put(
  "/group/announcements",
  groupController.setGroupAnnoucementController
);

router.put("/group/name", groupController.setGroupNameController);

router.delete(
  "/group/disband/:group_id",
  groupController.disBandGroupController
);

router.put("/member/role", groupController.updateGropMembersRoleController);

router.delete("/group/member", groupController.deleteGroupMemberController);

router.post("/member/invite", groupController.inviteGroupMember);

router.post("/last/seen", lastSeenController.lastSeenController);

router.get(
  "/messages/count/:id",
  messagesCountController.messagesCountController
);

router.get("/list/:username", chatListController.fetchChatList);

// Export the router to be used in other parts of the application
export default router;
