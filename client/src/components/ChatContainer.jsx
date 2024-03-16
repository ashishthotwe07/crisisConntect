import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const ChatContainer = () => {
  // Sample array of chat messages
  const chatMessages = [
    {
      id: 1,
      text: "Hey, Joel, I'm here to help you out please tell me",
      sender: "user",
      time: "11:26",
    },
    {
      id: 2,
      text: "I will send you all documents as soon as possible",
      sender: "bot",
      time: "12:26",
    },
    {
      id: 3,
      text: "Are you going on a business trip next week?",
      sender: "user",
      time: "8:26",
    },
    {
      id: 4,
      text: "I suggest to start a new business soon",
      sender: "bot",
      time: "7:16",
    },
    {
      id: 5,
      text: "We need to start a new research center.",
      sender: "user",
      time: "9:26",
    },
    {
      id: 6,
      text: "Maybe yes",
      sender: "bot",
      time: "3:26",
    },
  ];

  const [isChatOpen, setIsChatOpen] = useState(true);

  // Function to toggle the chat container
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Function to close the chat container
  const closeChat = () => {
    setIsChatOpen(false);
  };

  return (
    <>
      {isChatOpen && (
        <div className="py-10 w-full bg-gray-300 px-2">
          <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden md:max-w-lg">
            <div className="p-4 border-b bg-gray-500 text-white rounded-t-lg flex justify-between items-center">
              <p className="text-lg m-auto font-semibold">Ashish</p>
              <button onClick={closeChat} className="focus:outline-none">
                <FaTimes className="w-6 h-6 text-gray-300 hover:text-gray-400 cursor-pointer" />
              </button>
            </div>
            <div
              className="p-4 bg-blue-200 h-80 overflow-y-auto"
              style={{ scrollbarWidth: "none" }}
            >
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-2 ${
                    message.sender === "user" ? "text-right" : ""
                  }`}
                >
                  <p
                    className={`bg-${
                      message.sender === "user" ? "gray" : "blue"
                    }-500 text-white rounded-lg py-2 px-4 inline-block`}
                  >
                    {message.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="p-4 border-t flex">
              <input
                type="text"
                placeholder="Type a message"
                className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatContainer;
