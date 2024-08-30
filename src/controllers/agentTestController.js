// agentTestController.js
import logger from "../utils/logger.js";
// import testUsers from "../models/agentGroupModel.js";
import {testAgent, testUsers} from "../models/agentGroupModel.js";

const testAgents = async (agentId) => {
    logger.info(`messageCountService: ${agentId}`);
    const agentData = await testAgent(agentId);
    logger.info(agentData);
    const members = JSON.parse(agentData.team_members || '[]');
    const superiorId = JSON.parse(agentData.agent_id) || null;

    if (members.length === 0) {
        return { message: 'no resource found' };
    }

    const usernames = await Promise.all(members.map(async (memberId) => {
        const user = await testUsers(memberId);
        return user.username;
    }));

    const finalMembers = usernames.map((username, index) => ({
        name: username,
        status: index === 0 ? 'active' : 'inactive'
    }));

    const superior = superiorId ? await testUsers(superiorId) : { username: 'Unknown' };

    return {
        superior: superior.username,
        me: {
            name: (await testUsers(agentId)).username,
            members: finalMembers
        }
    };
};

export default testAgents;
