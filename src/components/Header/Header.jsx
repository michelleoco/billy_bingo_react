import "./Header.css";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo-link">
          <div className="header__logo">BILLY BINGO</div>
        </Link>
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
