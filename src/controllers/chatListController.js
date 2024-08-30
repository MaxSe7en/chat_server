import chatListHelper from "../helpers/chatListHelper.js";

const fetchChatList = async (req, res) => {
  const username = req.params.username;

  let results = await chatListHelper.fetchChatListData(username);

  res.status(200).json(Object.keys(results));
};

export default {
  fetchChatList,
};
