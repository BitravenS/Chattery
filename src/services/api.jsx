const API_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) {
  console.error("API_URL is not set");
}

export async function fetcher(url, options = {}) {
  try {
    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      credentials: "include", // Ensures cookies are sent
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}), // Merge headers safely
      },
    });

    if (!response.ok) {
      const error = new Error(
        `API request failed with status ${response.status}`
      );
      error.status = response.status;

      // Try parsing JSON if possible
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        try {
          error.info = await response.json();
        } catch (e) {
          error.info = "Could not parse error response";
        }
      } else {
        error.info = await response.text(); // Fallback for non-JSON errors
      }

      throw error;
    }

    // Ensure JSON response parsing
    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    return response.text(); // Fallback for non-JSON responses
  } catch (e) {
    if (e.message.includes("Failed to fetch")) {
      alert("Unable to connect to the backend. This is the calling url" + url);
    }
    console.error("API error:", e);
    throw e;
  }
}
