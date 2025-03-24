import { fetcher } from "./api";

export const authService = {
  login: async (provider) => {
    const data = await fetcher(`/api/auth/login?provider=${provider}`, {
      method: "POST",
    });

    // Redirect to provider's authentication page
    if (data.redirect_url) {
      window.location.href = data.redirect_url;
    }

    return data;
  },

  logout: async () => {
    return fetcher("/api/auth/logout", {
      method: "POST",
    });
  },

  getStatus: async () => {
    return fetcher("/api/auth/status");
  },
};
