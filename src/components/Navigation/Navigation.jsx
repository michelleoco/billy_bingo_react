import "./Navigation.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { ModalContext } from "../../contexts/ModalContext";

function Navigation() {
  const { currentUser, handleLogout } = useContext(CurrentUserContext);
  const { openLoginModal } = useContext(ModalContext);
  const isLoggedIn = !!currentUser;

  return (
    <nav className="navigation">
      <div className="navigation__links">
        {/* This can be used for future navigation links */}
      </div>
      <div className="navigation__auth">
        <Link to="/" className="navigation__link-text">
          Home
        </Link>
        {isLoggedIn ? (
          <button className="navigation__button" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <button className="navigation__button" onClick={openLoginModal}>
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
