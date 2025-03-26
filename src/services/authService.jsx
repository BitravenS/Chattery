import { fetcher } from "./api";

export const authService = {
  login: async (provider) => {
    const data = await fetcher(`/api/auth/login?provider=${provider}`, {
      method: "POST",
    });

    if (data.redirect_url) {
      const width = 500;
      const height = 600;
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;

      const popup = window.open(
        data.redirect_url,
        "oauth-popup",
        `width=${width},height=${height},top=${top},left=${left}`
      );

      if (!popup) {
        throw new Error("Popup blocked! Please allow popups for this site.");
      }

      // Periodically check if the popup was redirected to the main page
      const interval = setInterval(() => {
        try {
          if (popup.location.origin === window.location.origin) {
            if (popup.location.pathname === "/auth/callback") {
              popup.close();
              clearInterval(interval);
              window.location.reload();
            }
          }
        } catch (error) {}
        if (popup.closed) {
          clearInterval(interval);
        }
      }, 100);
    }
  },
  handleSaveChanges: async () => {
    try {
      await fetch("/auth/update-username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: tempUsername,
          id: user.id,
          token: user.token,
        }),
      });
      setUsername(tempUsername);
    } catch (error) {
      console.error("Failed to update username:", error);
    }
  },

  handleCallback: async () => {
    // This endpoint should verify the OAuth callback and return user data
    return fetcher("/api/auth/callback");
  },

  logout: async () => {
    return fetcher("/api/auth/logout", {
      method: "POST",
    });
  },

  getStatus: async () => {
    return fetcher("/api/auth/status", {
      method: "GET",
    });
  },
};
