import React from "react";

const ChatSidebar = () => {
  // Sample array of chat messages
  const chatMessages = [
    {
      id: 1,
      avatar: "https://i.imgur.com/aq39RMA.jpg",
      name: "Jessica Koel",
      message: "Hey, Joel, I'm here to help you out please tell me",
      time: "11:26",
    },
    {
      id: 2,
      avatar: "https://i.imgur.com/eMaYwXn.jpg",
      name: "Komeial Bolger",
      message: "I will send you all documents as soon as possible",
      time: "12:26",
    },
    {
      id: 3,
      avatar: "https://i.imgur.com/zQZSWrt.jpg",
      name: "Tamaara Suiale",
      message: "Are you going on a business trip next week?",
      time: "8:26",
    },
    {
      id: 4,
      avatar: "https://i.imgur.com/agRGhBc.jpg",
      name: "Sam Nielson",
      message: "I suggest to start a new business soon",
      time: "7:16",
    },
    {
      id: 5,
      avatar: "https://i.imgur.com/uIgDDDd.jpg",
      name: "Caroline Nexon",
      message: "We need to start a new research center.",
      time: "9:26",
    },
    {
      id: 6,
      avatar: "https://i.imgur.com/tT8rjKC.jpg",
      name: "Patrick Koeler",
      message: "Maybe yes",
      time: "3:26",
    },
  ];

  return (
    <div className="py-10 w-1/3  bg-gray-300 px-2" style={{height:"600px"}}>
      <div className="max-w-md h-full mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden md:max-w-lg">
        <div className="md:flex h-full">
          <div className="w-full p-4">
            <div className="relative">
              <input
                type="text"
                className="w-full h-12 rounded focus:outline-none px-3 focus:shadow-md"
                placeholder="Search..."
              />
              <i className="fa fa-search absolute right-3 top-4 text-gray-300"></i>
            </div>
            <ul className="overflow-y-auto ">
              {chatMessages.map((message) => (
                <li
                  key={message.id}
                  className="flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition"
                >
                  <div className="flex ml-2">
                    <img
                      src={message.avatar}
                      width="40"
                      height="40"
                      className="rounded-full"
                      alt="User Avatar"
                    />
                    <div className="flex flex-col ml-2">
                      <span className="font-medium text-black">{message.name}</span>
                      <span className="text-sm text-gray-400 truncate w-32">
                        {message.message}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-gray-300">{message.time}</span>
                    <i className="fa fa-star text-green-400"></i>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
