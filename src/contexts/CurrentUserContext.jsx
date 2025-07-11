import { createContext, useState, useEffect } from "react";

export const CurrentUserContext = createContext();

export function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simulate checking for a logged-in user on initial load
  useEffect(() => {
    // In a real app, you would check for a token in localStorage or cookies
    // and make an API call to validate the token and get the user data
    const token = localStorage.getItem("token");
    if (token) {
      // Simulate fetching user data
      setCurrentUser({ name: "User", email: "user@example.com" });
      setIsLoggedIn(true);
    }
  }, []);

  // Function to handle user login
  const handleLogin = (userData) => {
    // In a real app, you would make an API call to authenticate the user
    // and store the token in localStorage or cookies
    localStorage.setItem("token", "dummy-token");
    setCurrentUser(userData);
    setIsLoggedIn(true);
  };

  // Function to handle user logout
  const handleLogout = () => {
    // In a real app, you would make an API call to invalidate the token
    // and remove it from localStorage or cookies
    localStorage.removeItem("token");
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        isLoggedIn,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}
