import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Create from "../Create/Create";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoutes/ProtectedRoutes";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import RegisterSuccessModal from "../RegisterSuccessModal/RegisterSuccessModal";
import BingoCard from "../BingoCard/BingoCard";
import { SavedCardsProvider } from "../../contexts/SavedCardsContext";

function App() {
  const [count, setCount] = useState(0);

  return (
    <SavedCardsProvider>
      <div className="page">
        <div className="content">
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <Create />
                </ProtectedRoute>
              }
            />
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
    </SavedCardsProvider>
  );
}

export default App;
