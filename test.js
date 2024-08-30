// const timestamp = 1719934755627;
// const date = new Date(timestamp);

// const year = date.getFullYear();
// const month = date.getMonth() + 1; // Months are zero-based
// const day = date.getDate();
// const hours = date.getHours();
// const minutes = date.getMinutes();
// const seconds = date.getSeconds();

// console.log(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);

//@from>aframson>save:urls.js

// Function to push data into Redis

// function generateUniqueKeyForSenderAndReceiver(str) {
//   const normalizedStr = str.split("|").sort().join("|");
//   return normalizedStr;
// }

// // Usage example
// const string1 = "roodev|Kpanti";
// const string2 = "Kpanti|roodev";

// console.log(generateUniqueKeyForSenderAndReceiver(string1)); // This will store the value under 'kpanti|roodev'
// console.log(generateUniqueKeyForSenderAndReceiver(string2)); // This will also store the value under 'kpanti|roodev'

const abc = [
  [
    {
      group_id: "9181880848",
      group_name: "test1",
      agent_name: "Kpanti",
      user_name: "makaifui",
      member_id: 67,
    },
    {
      group_id: "9181880848",
      group_name: "test1",
      agent_name: "Kpanti",
      user_name: "Theboy",
      member_id: 68,
    },
    {
      group_id: "9181880848",
      group_name: "test1",
      agent_name: "Kpanti",
      user_name: "logos",
      member_id: 69,
    },
  ],
  [
    {
      group_id: "1026107024",
      group_name: "test2",
      agent_name: "Kpanti",
      user_name: "makaifui",
      member_id: 70,
    },
    {
      group_id: "1026107024",
      group_name: "test2",
      agent_name: "Kpanti",
      user_name: "Theboy",
      member_id: 71,
    },
    {
      group_id: "1026107024",
      group_name: "test2",
      agent_name: "Kpanti",
      user_name: "logos",
      member_id: 72,
    },
  ],
];

function groupByGroupName(data) {
  const grouped = [];

  // Create a map to track groups by group_name
  const groupMap = {};

  data.forEach((item) => {
    // Check if the group_name already exists in the map
    if (!groupMap[item.group_name]) {
      // If not, create a new group and push it to the grouped array
      groupMap[item.group_name] = [];
      grouped.push(groupMap[item.group_name]);
    }
    // Add the current item to the appropriate group
    groupMap[item.group_name].push(item);
  });

  return grouped;
}

// Sample data
const data = [
  {
    group_id: "9181880848",
    group_name: "test1",
    agent_name: "Kpanti",
    user_name: "makaifui",
    member_id: 67,
  },
  {
    group_id: "9181880848",
    group_name: "test1",
    agent_name: "Kpanti",
    user_name: "Theboy",
    member_id: 68,
  },
  {
    group_id: "9181880848",
    group_name: "test1",
    agent_name: "Kpanti",
    user_name: "logos",
    member_id: 69,
  },
  {
    group_id: "1026107024",
    group_name: "test2",
    agent_name: "Kpanti",
    user_name: "makaifui",
    member_id: 70,
  },
  {
    group_id: "1026107024",
    group_name: "test2",
    agent_name: "Kpanti",
    user_name: "Theboy",
    member_id: 71,
  },
  {
    group_id: "1026107024",
    group_name: "test2",
    agent_name: "Kpanti",
    user_name: "logos",
    member_id: 72,
  },
];

// Group the data by group_name
const groupedData = groupByGroupName(data);

console.log(JSON.stringify(groupedData, null, 2));

const groups = [
  {
    group_name: "test1",
    group_id: "1026107024",
    members: [
      {
        user_name: "makaifui",
        member_id: 70,
      },
      {
        user_name: "andi",
        member_id: 71,
      },
      {
        user_name: "fred",
        member_id: 72,
      },
    ],
  },
  {
    group_name: "test2",
    group_id: "1026107024",
    members: [
      {
        user_name: "makaifui",
        member_id: 70,
      },
      {
        user_name: "andi",
        member_id: 71,
      },
      {
        user_name: "fred",
        member_id: 72,
      },
    ],
  },
];

// my name is barry allen and i am the fastest 

console.log(process.env.NODE_ENV)