const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function fetcher(url, options = {}) {
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

  return response.json();
}
