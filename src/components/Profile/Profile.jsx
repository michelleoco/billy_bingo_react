import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { SavedCardsContext } from "../../contexts/SavedCardsContext";
import { getUserBingoCards, deleteBingoCard } from "../../utils/bingoCardApi";

function Profile() {
  const { currentUser } = useContext(CurrentUserContext);
  const { savedCards, deleteSavedCard } = useContext(SavedCardsContext);

  // State for database cards
  const [databaseCards, setDatabaseCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load cards from database when component mounts or user changes
  useEffect(() => {
    const loadDatabaseCards = async () => {
      if (!currentUser) return;

      setIsLoading(true);
      setError(null);
      try {
        const cards = await getUserBingoCards();
        setDatabaseCards(cards);
      } catch (err) {
        console.error("Error loading database cards:", err);
        setError("Failed to load cards from database");
      } finally {
        setIsLoading(false);
      }
    };

    loadDatabaseCards();
  }, [currentUser]);

  // Combine database cards and local storage cards
  const allCards = [
    ...databaseCards.map((card) => ({
      id: card.id || card._id,
      cardDetails: {
        name: card.name,
        date: card.date,
        venue: card.venue,
      },
      squares: card.squares,
      createdAt: card.createdAt,
      isFromDatabase: true,
    })),
    ...savedCards.map((card) => ({
      ...card,
      isFromDatabase: false,
    })),
  ];

  const handleDeleteCard = async (cardId, isFromDatabase) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      try {
        if (isFromDatabase) {
          await deleteBingoCard(cardId);
          setDatabaseCards((prev) =>
            prev.filter((card) => (card.id || card._id) !== cardId)
          );
        } else {
          deleteSavedCard(cardId);
        }
      } catch (err) {
        console.error("Error deleting card:", err);
        alert("Failed to delete card. Please try again.");
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No date specified";
    return dateString;
  };

  return (
    <main className="profile">
      <div className="profile__header">
        <h1 className="profile__title">My Profile</h1>
        <p className="profile__subtitle">
          Welcome back, {currentUser?.name || "User"}!
        </p>
      </div>

      <section className="profile__cards">
        <h2 className="profile__cards-title">My Bingo Cards</h2>

        {isLoading && <p className="profile__loading">Loading your cards...</p>}

        {error && <p className="profile__error">{error}</p>}

        {!isLoading && allCards.length === 0 ? (
          <div className="profile__empty">
            <p className="profile__empty-text">
              You haven't created any bingo cards yet.
            </p>
            <p className="profile__empty-subtext">
              Go to the{" "}
              <Link to="/create" className="profile__link">
                Create
              </Link>{" "}
              page to make your first card!
            </p>
          </div>
        ) : (
          <div className="profile__cards-grid">
            {allCards.map((card) => (
              <div key={card.id} className="card-preview">
                <div className="card-preview__header">
                  <h3 className="card-preview__name">
                    {card.cardDetails.name}
                  </h3>
                  <div className="card-preview__actions">
                    {card.isFromDatabase && (
                      <span className="card-preview__badge">Saved</span>
                    )}
                    <button
                      className="card-preview__delete"
                      onClick={() =>
                        handleDeleteCard(card.id, card.isFromDatabase)
                      }
                      title="Delete card"
                    >
                      ×
                    </button>
                  </div>
                </div>

                <div className="card-preview__details">
                  <p className="card-preview__date">
                    <strong>Date:</strong> {formatDate(card.cardDetails.date)}
                  </p>
                  <p className="card-preview__venue">
                    <strong>Venue:</strong>{" "}
                    {card.cardDetails.venue || "No venue specified"}
                  </p>
                  <p className="card-preview__created">
                    <strong>Created:</strong>{" "}
                    {new Date(card.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="card-preview__bingo">
                  <div className="card-preview__grid">
                    {card.squares.map((square, index) => (
                      <div key={index} className="card-preview__square">
                        {index === 12 ? "FREE" : square || ""}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Profile;
