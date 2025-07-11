import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoutes/ProtectedRoutes";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import RegisterSuccessModal from "../RegisterSuccessModal/RegisterSuccessModal";
import BingoCard from "../BingoCard/BingoCard";
// This is the main application component that sets up the routing and layout of the app.
// It includes the header, footer, and main content area, as well as modals for login and registration.
// The App component uses React Router to define routes for the main page and the profile page.
// The profile page is protected, meaning it can only be accessed by authenticated users.
// The useState hook is used to manage the state of the count, although it is not currently used in the UI.
// The App component is exported as the default export of the module.

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="page">
      <div className="content">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/bingo" element={<BingoCard />} />
        </Routes>
      </div>
      <LoginModal />
      <RegisterModal />
      <RegisterSuccessModal />
      <Footer />
    </div>
  );
}

export default App;
