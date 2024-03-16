import React from "react";
import ChatSidebar from "../components/ChatSidebar";
import ChatApp from "../components/ChatBox";

export default function MessageContainer() {
  return (
    <div className="flex w-full h-full">
      <ChatSidebar></ChatSidebar>
      <ChatApp></ChatApp>
    </div>
  );
}
