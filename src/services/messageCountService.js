import testAgents  from "../controllers/agentTestController.js";
import groupChatMessageHelpers from "../helpers/groupChatMessageHelpers.js";
import { query } from "../utils/dbUtils.js";
import { generateUniqueKeyForSenderAndReceiver } from "../utils/generateUniqueKeyForSenderAndReceiver.js";
import logger from "../utils/logger.js";
import redisClient from "../utils/redisClient.js";

async function messageCountService(uid) {
  const response = await testAgents(uid);
  logger.info(`messageCountService: ${uid}`);
  logger.info(response);
  // await fetch(
  //   `localhost/task/redis-main/api/v1/agentgroup/${uid}`
  // );
  const results = await response.json();
  // console.log("results ", results[0]["me"]["name"]);
  // console.log("results ", Object.values(results[0]));
  let superior = results[0]["superior"];
  let active_user = results[0]["me"]["name"];
  let members = results[0]["me"]["members"];
  let current_user_name = results[0]["me"]["name"];

  let userAndGroupNamesForMessages = [];
  let userAndGroupNamesForRedisLastSeen = [];

  // lower level users
  members.forEach(({ name }) => {
    let uniqueChatKey = generateUniqueKeyForSenderAndReceiver(
      `${current_user_name}|${name}`
    );
    userAndGroupNamesForMessages.push(uniqueChatKey);
    userAndGroupNamesForRedisLastSeen.push(name);
  });

  // superior
  userAndGroupNamesForMessages.push(
    generateUniqueKeyForSenderAndReceiver(`${superior}|${current_user_name}`)
  );
  userAndGroupNamesForRedisLastSeen.push(superior);

  // Fetching group ids from where the user belongs
  let fetchGroupAndMembersByAgentNameData =
    await fetchGroupAndMembersByAgentName(current_user_name);
  fetchGroupAndMembersByAgentNameData.forEach(({ group_id }) => {
    userAndGroupNamesForMessages.push(+group_id);
    userAndGroupNamesForRedisLastSeen.push(+group_id);
  });
  // console.log(fetchGroupAndMembersByAgentNameData);
  //   :1723637138285
  let lastSeens = await redisClient.hGetAll(
    `${current_user_name}LastSeen`,
    0,
    -1
  );

  let finalResults = [];

  await Promise.all(
    userAndGroupNamesForRedisLastSeen.map(async (name) => {
      let unique =
        typeof name === "string"
          ? generateUniqueKeyForSenderAndReceiver(
              `${name}|${current_user_name}`
            )
          : name;
      // console.log({ [name]: lastSeens[name], unique });
      // console.log(
      // );
      let messages = await redisClient.lRange(unique.toString(), 0, -1);
      let parsedMessages = messages.map((item) => JSON.parse(item));
      let filteredMessages = parsedMessages.filter(
        (message) =>
          current_user_name !== message.senderId &&
          message.timestamp > lastSeens[name]
      );
      // console.log({ uniqueChatKey: unique, count: filteredMessages.length });
      let receiver =
        typeof unique === "string"
          ? unique.split("|").filter((name) => name !== current_user_name)[0]
          : unique;

      finalResults.push({
        receiver,
        count: filteredMessages.length,
      });
    })
  );

  return finalResults;
}

async function fetchGroupAndMembersByAgentName(agentName) {
  try {
    const sql = `
                WITH relevant_groups AS (
        SELECT g.group_id, g.announcement
        FROM chat_groups g
        JOIN members m ON g.group_id = m.group_id
        WHERE g.agent_name = ?
           OR m.user_name = ?
    )
    
    SELECT 
        g.group_id, 
        g.group_name, 
        g.agent_name,
        g.announcement,
        m.user_name,
        m.member_id,
        m.role
    FROM 
        members m
    JOIN 
        chat_groups g ON m.group_id = g.group_id
    WHERE 
        g.agent_name = ?
       OR m.user_name = ?
       OR g.group_id IN (SELECT group_id FROM relevant_groups)
       AND g.agent_name <> ?;
        `;

    const results = await query(sql, [
      agentName,
      agentName,
      agentName,
      agentName,
      agentName,
    ]);

    // if (results.length === 0) {
    //   throw new Error("No group or members found for the provided agent name");
    // }

    // console.log("seeeee ", results);

    return groupChatMessageHelpers.rearrangeData(results);
  } catch (error) {
    console.error("Error fetching group and members:", error);
    logger.error("Error fetching group and members", error);
  }
}

export default { messageCountService };
