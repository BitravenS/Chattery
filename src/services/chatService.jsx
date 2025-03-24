import { fetcher } from "./api";

export const chatService = {
  getMessages: async () => {
    return fetcher("/api/chat/messages");
  },

  sendMessage: async (message) => {
    return fetcher("/api/chat/messages", {
      method: "POST",
      body: JSON.stringify({ message }),
    });
  },
};
