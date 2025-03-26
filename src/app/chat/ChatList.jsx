"use client";

import { useRef, useEffect } from "react";
import Message from "./Message";

export default function ChatList({ messages, currentUserId }) {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages come in
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // If no messages, show a placeholder
  if (!messages || messages.length === 0) {
    return (
      <div className="flex justify-center items-center h-full text-gray-500">
        No messages yet. Start the conversation!
      </div>
    );
  }
  const message = {
    id: "",
    user_id: "",
    text: "",
    created_at: "",
  };

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    // Format the date (e.g., "Today", "Yesterday", or "March 22, 2025")
    const date = new Date(message.created_at);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let dateStr;
    if (date.toDateString() === today.toDateString()) {
      dateStr = "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      dateStr = "Yesterday";
    } else {
      dateStr = date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }

    if (!groups[dateStr]) {
      groups[dateStr] = [];
    }

    groups[dateStr].push(message);
    return groups;
  }, {});

  return (
    <div className="space-y-6 scrollbar-hide">
      {Object.entries(groupedMessages).map(([date, dateMessages]) => (
        <div key={date}>
          <div className="text-center mb-4">
            <span className="px-3 py-1 bg-gray-100/60 text-gray-600 text-sm rounded-full">
              {date}
            </span>
          </div>

          <div className="space-y-4">
            {dateMessages.map((message) => (
              <Message
                key={message.id}
                message={message}
                isCurrentUser={message.user_id === currentUserId}
              />
            ))}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
