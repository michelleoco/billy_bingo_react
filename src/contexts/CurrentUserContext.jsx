import { createContext, useState, useEffect } from "react";
import { loginUser, getCurrentUser } from "../utils/userApi";

export const CurrentUserContext = createContext();

export function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for a logged-in user on initial load
  useEffect(() => {
    const checkCurrentUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const user = await getCurrentUser();
          setCurrentUser(user);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Error fetching current user:", error);
          // Token might be invalid, remove it
          localStorage.removeItem("token");
          setCurrentUser(null);
          setIsLoggedIn(false);
        }
      }
      setIsLoading(false);
    };

    checkCurrentUser();
  }, []);

  // Function to handle user login
  const handleLogin = async (credentials) => {
    try {
      const result = await loginUser(credentials);
      localStorage.setItem("token", result.token);
      setCurrentUser(result.user);
      setIsLoggedIn(true);
      return result;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        isLoggedIn,
        isLoading,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}
