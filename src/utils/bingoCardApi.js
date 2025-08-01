// API utility functions for bingo card operations

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.billybingo.moonangel.com/api"
    : "http://localhost:3001/api";

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }
  return response.json();
};

// Create a new bingo card
export const createBingoCard = async (cardData) => {
  try {
    console.log("API: Creating bingo card with data:", cardData);
    console.log("API: Request URL:", `${BASE_URL}/bingo-cards`);
    console.log("API: Request headers:", getAuthHeaders());

    const response = await fetch(`${BASE_URL}/bingo-cards`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(cardData),
    });

    console.log("API: Response status:", response.status);
    console.log("API: Response ok:", response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API: Error response text:", errorText);

      try {
        const errorData = JSON.parse(errorText);
        console.error("API: Error response data:", errorData);
      } catch (parseError) {
        console.error("API: Could not parse error response as JSON");
      }
    }

    const result = await handleResponse(response);
    console.log("API: Success response:", result);
    return result.data;
  } catch (error) {
    console.error("API: Error creating bingo card:", {
      message: error.message,
      stack: error.stack,
      error: error,
    });
    throw error;
  }
};

// Get all bingo cards for the authenticated user
export const getUserBingoCards = async (options = {}) => {
  try {
    const { limit = 50, skip = 0, sort = "createdAt" } = options;
    const queryParams = new URLSearchParams({
      limit: limit.toString(),
      skip: skip.toString(),
      sort,
    });

    const response = await fetch(`${BASE_URL}/bingo-cards?${queryParams}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const result = await handleResponse(response);
    return result.data;
  } catch (error) {
    console.error("Error fetching user bingo cards:", error);
    throw error;
  }
};

// Get a specific bingo card by ID
export const getBingoCardById = async (cardId) => {
  try {
    const response = await fetch(`${BASE_URL}/bingo-cards/${cardId}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const result = await handleResponse(response);
    return result.data;
  } catch (error) {
    console.error("Error fetching bingo card:", error);
    throw error;
  }
};

// Update a bingo card
export const updateBingoCard = async (cardId, updateData) => {
  try {
    const response = await fetch(`${BASE_URL}/bingo-cards/${cardId}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(updateData),
    });

    const result = await handleResponse(response);
    return result.data;
  } catch (error) {
    console.error("Error updating bingo card:", error);
    throw error;
  }
};

// Delete a bingo card
export const deleteBingoCard = async (cardId) => {
  try {
    const response = await fetch(`${BASE_URL}/bingo-cards/${cardId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    const result = await handleResponse(response);
    return result;
  } catch (error) {
    console.error("Error deleting bingo card:", error);
    throw error;
  }
};

// Get bingo card statistics
export const getBingoCardStats = async () => {
  try {
    const response = await fetch(`${BASE_URL}/bingo-cards/stats`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const result = await handleResponse(response);
    return result.data;
  } catch (error) {
    console.error("Error fetching bingo card stats:", error);
    throw error;
  }
};
