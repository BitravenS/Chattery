import { fetcher } from "./api";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) {
  console.error("API_URL is not set");
}
export const authService = {
  login: (provider) => {
    const width = 500;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    const authUrl = `${API_URL}/api/auth/login?provider=${provider}`;
    const popup = window.open(
      authUrl,
      "oauth-popup",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    if (!popup) {
      throw new Error("Popup blocked! Please allow popups for this site.");
    }

    const interval = setInterval(() => {
      try {
        if (popup.closed) {
          clearInterval(interval);
          window.location.reload();
        }

        if (popup.location.href.includes("/auth/callback")) {
          popup.close();
          clearInterval(interval);
          window.location.reload();
        }
      } catch (error) {
        // Ignore cross-origin errors
      }
    }, 500);
  },
  handleSaveChanges: async (tempUsername, saveUsername) => {
    try {
      console.log("handleSaveChanges");
      await fetch(`${API_URL}/api/auth/update-username`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: tempUsername,
          id: user.id,
          token: user.token,
        }),
      });
      saveUsername(tempUsername);
    } catch (error) {
      console.error("Failed to update username:", error);
    }
  },

  handleCallback: async () => {
    try {
      const response = await fetcher(`/api/auth/getstatus`, {
        credentials: "include",
      });
      return response;
    } catch (error) {
      console.error("OAuth callback error:", error);
      return null;
    }
  },

  logout: async () => {
    return fetcher(`/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  },

  getStatus: async () => {
    try {
      const response = await fetcher(`/api/auth/getstatus`, {
        credentials: "include",
      });
      return response;
    } catch (error) {
      console.error("Get status error:", error);
      return null;
    }
  },
};
