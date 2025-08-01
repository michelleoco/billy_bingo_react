// API utility functions for user operations

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.billybingo.moonangel.com/api"
    : "http://localhost:3001/api";

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message ||
        errorData.message ||
        `HTTP error! status: ${response.status}`
    );
  }
  return response.json();
};

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await handleResponse(response);
    return result.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const result = await handleResponse(response);
    return result.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

// Get current user profile
export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await handleResponse(response);
    return result.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};

// Update user profile
export const updateUser = async (updateData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${BASE_URL}/users/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });

    const result = await handleResponse(response);
    return result.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
