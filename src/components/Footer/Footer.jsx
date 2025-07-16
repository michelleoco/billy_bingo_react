import "./Footer.css";
import { Link } from "react-router-dom";
import githubIcon from "../../assets/github.svg";
import instagramIcon from "../../assets/Instagram.svg";
import webIcon from "../../assets/web.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        © 2025 Michelle O'Connell. Powered by setlist.fm API
      </p>
      <nav className="footer__nav">
        <Link to="/" className="footer__link">
          Home
        </Link>

        {/* <a
          href="https://michelleoco.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
        >
          <img src={webIcon} alt="Web" className="footer__icon" />
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
        >
          <img src={githubIcon} alt="GitHub" className="footer__icon" />
        </a>
        <a
          href="https://www.instagram.com/michelleoco"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
        >
          <img src={instagramIcon} alt="Instagram" className="footer__icon" />
        </a> */}
      </nav>
    </footer>
  );
}

export default Footer;
