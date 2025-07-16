import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./BingoCard.css";
import { fetchBillyStringsSongs } from "../../utils/setlistApi";
import { SavedCardsContext } from "../../contexts/SavedCardsContext";
import { createBingoCard } from "../../utils/bingoCardApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import BingoCardPreviewModal from "../BingoCardPreviewModal/BingoCardPreviewModal";

function BingoCard() {
  const navigate = useNavigate();
  const { saveCard } = useContext(SavedCardsContext);
  const { currentUser } = useContext(CurrentUserContext);

  // State for the bingo card
  const [cardDetails, setCardDetails] = useState({
    name: "",
    date: "",
    venue: "",
  });

  // State for preview modal
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewCard, setPreviewCard] = useState(null);

  // State for the bingo squares
  const [squares, setSquares] = useState(
    Array(25)
      .fill("")
      .map((_, index) => {
        // Make the middle square (index 12) a FREE space
        if (index === 12) {
          return "FREE";
        }
        return "";
      })
  );

  // State for the currently selected square for editing
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [searchText, setSearchText] = useState("");

  // State for storing Billy Strings songs from the API
  const [billySongs, setBillySongs] = useState([]);
  const [isLoadingSongs, setIsLoadingSongs] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [usingFallback, setUsingFallback] = useState(false);

  // Fetch songs from the setlist.fm API when the component mounts
  useEffect(() => {
    const getSongs = async () => {
      setIsLoadingSongs(true);
      setApiError(null);
      try {
        const songs = await fetchBillyStringsSongs();
        setBillySongs(songs);

        // Check if we're using fallback songs
        if (songs.length > 0 && songs[0] === "Dust in a Baggie") {
          setUsingFallback(true);
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
        setApiError("Failed to load songs. Using fallback list.");
        setUsingFallback(true);
      } finally {
        setIsLoadingSongs(false);
      }
    };

    getSongs();
  }, []);

  // Calculate progress
  const filledSquares = squares.filter((square) => square !== "").length;
  const progress = `${filledSquares}/25 squares filled`;

  // Handle input changes for card details
  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value,
    });
  };

  // Handle square click for editing
  const handleSquareClick = (index) => {
    setSelectedSquare(index);
    setSearchText(squares[index] || "");
  };

  // Handle random selection for a square
  const handleRandomSelect = (index) => {
    // Use the songs fetched from the API, or fallback to a default list if empty
    const songsToUse = billySongs.length > 0 ? billySongs : [];

    if (songsToUse.length === 0) {
      console.error("No songs available for random selection");
      return;
    }

    const randomSong =
      songsToUse[Math.floor(Math.random() * songsToUse.length)];

    const newSquares = [...squares];
    newSquares[index] = randomSong;
    setSquares(newSquares);

    // If this is the currently selected square in the modal, update the search text
    if (selectedSquare === index) {
      setSearchText(randomSong);
    }
  };

  // Handle search text change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // Handle setting the song for a square
  const handleSetSong = () => {
    if (selectedSquare !== null && searchText.trim() !== "") {
      const newSquares = [...squares];
      newSquares[selectedSquare] = searchText;
      setSquares(newSquares);
      setSelectedSquare(null);
      setSearchText("");
    }
  };

  // Handle closing the edit modal
  const handleCloseEdit = () => {
    setSelectedSquare(null);
    setSearchText("");
  };

  // Create card - show preview modal
  const handleCreateCard = () => {
    if (!cardDetails.name.trim()) {
      alert("Please enter a card name");
      return;
    }

    // Create preview card object
    const cardToPreview = {
      cardDetails,
      squares,
    };

    setPreviewCard(cardToPreview);
    setShowPreviewModal(true);
  };

  // Handle saving card to database
  const handleSaveCard = async (card) => {
    try {
      console.log("Starting card save process...");
      console.log("Current user:", currentUser);
      console.log("Card data to save:", card);

      // If user is logged in, save to database
      if (currentUser) {
        const cardData = {
          name: card.cardDetails.name,
          date: card.cardDetails.date || "",
          venue: card.cardDetails.venue || "",
          squares: card.squares,
        };

        console.log("Formatted card data for API:", cardData);
        console.log("Auth token exists:", !!localStorage.getItem("token"));

        const savedCard = await createBingoCard(cardData);
        console.log("Card saved to database successfully:", savedCard);
      } else {
        console.log("User not logged in, skipping database save");
      }

      // Also save to local storage context for backward compatibility
      const cardId = saveCard(card.cardDetails, card.squares);
      console.log("Card saved to local storage with ID:", cardId);

      // Navigate to profile page
      navigate("/profile");
    } catch (error) {
      console.error("Detailed error saving card:", {
        message: error.message,
        stack: error.stack,
        error: error,
      });
      throw error; // Re-throw to be handled by the modal
    }
  };

  // Handle closing preview modal
  const handleClosePreviewModal = () => {
    setShowPreviewModal(false);
    setPreviewCard(null);
  };

  // Handle editing card from preview modal
  const handleEditCard = () => {
    // Close the preview modal
    setShowPreviewModal(false);
    setPreviewCard(null);
    // The card data is already in the current state, so user can continue editing
  };

  return (
    <div className="bingo-card">
      {/* <h1 className="bingo-card__title">CREATE</h1>
      <p className="bingo-card__subtitle">
        Build your custom BINGO card for the upcoming show
      </p> */}

      {isLoadingSongs && (
        <p className="bingo-card__loading">
          Loading Billy Strings songs from setlist.fm...
        </p>
      )}

      {apiError && <p className="bingo-card__error">{apiError}</p>}

      {usingFallback && !apiError && !isLoadingSongs && (
        <p className="bingo-card__fallback">
          Using a curated list of Billy Strings songs due to API restrictions.
          <br />
          <small>
            In a production environment, this would connect to the setlist.fm
            API.
          </small>
        </p>
      )}

      <div className="bingo-card__content">
        {/* Card Details Form */}
        <div className="card-details">
          <h2 className="card-details__title">Card Details</h2>
          <p className="card-details__subtitle">
            Add information about your BINGO card
          </p>

          <div className="card-details__form">
            <div className="form-field">
              <label className="form-field__label">Card Name *</label>
              <input
                type="text"
                name="name"
                value={cardDetails.name}
                onChange={handleCardDetailsChange}
                placeholder="e.g., Denver Night 1"
                className="form-field__input"
                required
              />
            </div>

            <div className="form-field">
              <label className="form-field__label">Concert Date</label>
              <input
                type="text"
                name="date"
                value={cardDetails.date}
                onChange={handleCardDetailsChange}
                placeholder="mm/dd/yyyy"
                className="form-field__input"
              />
            </div>

            <div className="form-field">
              <label className="form-field__label">Venue</label>
              <input
                type="text"
                name="venue"
                value={cardDetails.venue}
                onChange={handleCardDetailsChange}
                placeholder="e.g., Ball Arena"
                className="form-field__input"
              />
            </div>

            <div className="form-field">
              <label className="form-field__label">Progress:</label>
              <p className="form-field__text">{progress}</p>
            </div>

            <button
              className="card-details__button"
              onClick={handleCreateCard}
              disabled={!cardDetails.name}
            >
              Create card
            </button>
          </div>
        </div>

        {/* Bingo Grid */}
        <div className="bingo-grid">
          <h2 className="bingo-grid__title">Create Your BINGO Card</h2>

          <div className="bingo-grid__container">
            {squares.map((square, index) => (
              <div key={index} className="bingo-square">
                <div
                  className="bingo-square__content"
                  onClick={() => handleSquareClick(index)}
                >
                  {index === 12 ? (
                    <span className="bingo-square__free">FREE</span>
                  ) : (
                    square || `Square ${index + 1}`
                  )}
                </div>
                {index !== 12 && (
                  <button
                    className="bingo-square__random"
                    onClick={() => handleRandomSelect(index)}
                  >
                    <span className="bingo-square__random-icon">🎲</span>
                    Random
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Square Modal */}
      {selectedSquare !== null && (
        <div className="edit-modal">
          <div className="edit-modal__content">
            <h3 className="edit-modal__title">
              Edit Square {selectedSquare + 1}
            </h3>

            <div className="edit-modal__search">
              <input
                type="text"
                value={searchText}
                onChange={handleSearchChange}
                placeholder="Search for a song..."
                className="edit-modal__search-input"
              />
              <button
                className="edit-modal__random"
                onClick={() => handleRandomSelect(selectedSquare)}
              >
                <span className="edit-modal__random-icon">🎲</span>
                Random
              </button>
            </div>

            <div className="edit-modal__actions">
              <button className="edit-modal__close" onClick={handleCloseEdit}>
                Close
              </button>
              <button className="edit-modal__set" onClick={handleSetSong}>
                Set Song
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && previewCard && (
        <BingoCardPreviewModal
          card={previewCard}
          onClose={handleClosePreviewModal}
          onSave={handleSaveCard}
          onEdit={handleEditCard}
        />
      )}
    </div>
  );
}

export default BingoCard;
