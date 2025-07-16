import "./Main.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { ModalContext } from "../../contexts/ModalContext";

function Main() {
  const { isLoggedIn } = useContext(CurrentUserContext);
  const { openRegisterModal } = useContext(ModalContext);

  return (
    <main className="main">
      <div className="main__container">
        <section className="hero">
          <h1 className="hero__title">BILLY BINGO</h1>
          {isLoggedIn ? (
            <Link to="/create" className="hero__button">
              + New Card
            </Link>
          ) : (
            <button className="hero__button" onClick={openRegisterModal}>
              Create Your Card
            </button>
          )}
        </section>

        <section className="features">
          <div className="feature-card">
            <div className="feature-card__header">
              <div className="feature-card__icon">🐐</div>
              <h3 className="feature-card__title">Create Cards</h3>
            </div>
            <p className="feature-card__text">
              Build custom BINGO cards with your favorite Billy Strings songs.
              Use manual entry or our random song selector.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-card__header">
              <div className="feature-card__icon">🐐</div>
              <h3 className="feature-card__title">Play Live</h3>
            </div>
            <p className="feature-card__text">
              Mark off songs as they're played during the concert. The app will
              automatically detect when you get BINGO!
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-card__header">
              <div className="feature-card__icon">🐐</div>
              <h3 className="feature-card__title">Share & Archive</h3>
            </div>
            <p className="feature-card__text">
              Save your cards as digital memorabilia and share your wins with
              fellow Goats in the community.
            </p>
          </div>
        </section>
      </div>

      {/* <section className="about">
        <div className="about__image-container">
          <img
            src="./src/assets/author.jpg"
            alt="Author"
            className="about__image"
          />
        </div>
        <div className="about__content">
          <h2 className="about__title">About the author</h2>
          <p className="about__text">
            This block describes the project author. Here you should indicate
            your name, what you do, and which development technologies you know.
          </p>
          <p className="about__text">
            You can also talk about your experience with TripleTen, what you
            learned there, and how you can help potential customers.
          </p>
        </div>
      </section> */}
    </main>
  );
}

export default Main;
