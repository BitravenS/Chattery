"use client";

export default function Message({ message, isCurrentUser }) {
  // Format timestamp to show time (e.g., "10:42 AM")
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] px-4 py-2 rounded-lg ${
          isCurrentUser
            ? "bg-blue-500/90 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        {!isCurrentUser && (
          <div className="font-semibold text-sm mb-1">{message.username}</div>
        )}
        <div>{message.message}</div>
        <div
          className={`text-xs mt-1 text-right ${
            isCurrentUser ? "text-blue-100" : "text-gray-500"
          }`}
        >
          {formatTime(message.created_at)}
        </div>
      </div>
    </div>
  );
}
