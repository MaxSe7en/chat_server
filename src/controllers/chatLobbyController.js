import { getGroupAndMembersByAgentName } from "../services/groupChatService.js";
import logger from "../utils/logger.js";
import dotenv from "dotenv";
import testAgents  from "./agentTestController.js";

// Load environment variables from the .env file
dotenv.config();
const chatLobbyController = async (req, res) => {
  // console.log("xxxxxx ", req.params.uid);

  try {
    const response = await testAgents(req.params.uid);
    logger.info(`messageCountService: ${uid}`);
    logger.info(response);
    // await fetch(
    //   `localhost/task/redis-main/api/v1/agentgroup/${req.params.uid}`
    // );
    const results = await response.json();
    // console.log("results ", results[0]["me"]["name"]);
    // console.log("results ", Object.values(results[0]));
    let superior = results[0]["superior"];
    let active_user = results[0]["me"]["name"];
    let members = results[0]["me"]["members"];
    let current_user_name = results[0]["me"]["name"];

    let new_members = {};

    for (let member of members) {
      // console.log("member ", member);
      new_members[member.name] = {
        // name: "Randy",
        user_name: member.name,
        status: member.status,
        messages: [],
      };
    }

    // console.log("new_members ", new_members);
    // console.log("superior ", superior);
    // console.log(
    //   "getGroupAndMembersByAgentName ",
    //   getGroupAndMembersByAgentName("Kpanti")
    // );

    let public_account = [
      {
        label: "System notifications",
        messages: [
          {
            message: "Welcome to the chat!",
            timestamp: "",
          },
          {
            message: "Please join the chat room!",
            timestamp: "",
          },
        ],
      },
    ];

    let my_group_chat = await getGroupAndMembersByAgentName(current_user_name);

    let senior_user = {
      user_name: superior,
      messages: [],
    };

    let lower_level_users = {
      [active_user]: new_members,
    };

    let data = {
      public_account,
      my_group_chat,
      senior_user,
      lower_level_users,
    };

    res.status(200).send(data);
  } catch (error) {
    console.log("Error fetching chat lobby data ---> ", error);
    logger.error("Error fetching chat lobby data", error); // Log error to logger
    res.status(500).send("Error fetching chat lobby data"); // Send error response on failure
  }
};

export default {
  chatLobbyController,
};
