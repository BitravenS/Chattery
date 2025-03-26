"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useWebSocket } from "@/hooks/useWebSocket";
import ChatList from "@/app/chat/ChatList";
import ChatInput from "@/app/chat/ChatInput";

export default function Chat() {
  const { user } = useAuth();

  // ✅ Use WebSocket for messages
  const {
    lastMessage,
    messageHistory,
    sendMessage: sendWsMessage,
  } = useWebSocket(`ws://127.0.0.1:8080/api/chat/ws`);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [messages, setMessages] = useState<any[]>([]);

  // ✅ Load initial messages from WebSocket history
  useEffect(() => {
    setMessages(messageHistory);
  }, [messageHistory]);

  // ✅ Handle new messages from WebSocket
  useEffect(() => {
    if (lastMessage) {
      setMessages((prevMessages) => [...prevMessages, lastMessage]);
    }
  }, [lastMessage]);

  // ✅ Send message via WebSocket
  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    try {
      sendWsMessage({ text }); // ✅ Send message as JSON
    } catch (error) {
      console.error("Error sending message through WebSocket:", error);
    }
  };

  return (
    <div className="flex flex-col h-80 bg-gray-50 rounded-lg shadow">
      <div className="flex-grow overflow-y-auto p-4">
        <ChatList messages={messages} currentUserId={user?.id} />
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}
