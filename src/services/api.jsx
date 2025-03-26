const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8080";

export async function fetcher(url, options = {}) {
  try {
    const defaultOptions = {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    };

    const response = await fetch(`${API_URL}${url}`, {
      ...defaultOptions,
      ...options,
    });

    // If not OK, throw error
    if (!response.ok) {
      const error = new Error("API request failed");
      error.status = response.status;
      try {
        error.info = await response.json();
      } catch (e) {
        error.info = "Could not parse error response";
      }
      throw error;
    }

    // Parse and return JSON response
    try {
      return await response.json();
    } catch (e) {
      throw new Error("Failed to parse JSON response");
    }
  } catch (e) {
    if (e.message === "Failed to fetch") {
      alert("Unable to connect to the backend. Please check your internet connection.");
    }
    console.error("API error:", e);
    throw e;
  }
}
