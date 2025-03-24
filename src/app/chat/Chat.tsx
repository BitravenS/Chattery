"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useWebSocket } from "@/hooks/useWebSocket";
import { chatService } from "@/services/chatService";
import ChatList from "./ChatList";
import ChatInput from "./ChatInput";

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Use WebSocket hook for connection
  const { lastMessage, sendMessage: sendWsMessage } = useWebSocket(
    `${process.env.NEXT_PUBLIC_WS_URL}/api/chat/ws`
  ) as { lastMessage: { data: string } | null; sendMessage: (message: string) => void };

  // Load messages when component mounts
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await chatService.getMessages();
        setMessages(data);
      } catch (error) {
        console.error("Error loading messages:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, []);

  // Handle incoming WebSocket messages
  useEffect(() => {
    if (lastMessage) {
      try {
        const messageData = lastMessage?.data ? JSON.parse(lastMessage.data) : null;
        setMessages((prevMessages) => [messageData, ...prevMessages]);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    }
  }, [lastMessage]);

  // Handle sending a new message
  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    try {
      await chatService.sendMessage(text);
      // The message will come back through WebSocket
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col h-[80vh] bg-gray-50 rounded-lg shadow">
      <div className="flex-grow overflow-y-auto p-4">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <ChatList messages={messages} currentUserId={user?.id} />
        )}
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}
