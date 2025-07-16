import { createContext, useState, useEffect } from "react";

export const SavedCardsContext = createContext();

export function SavedCardsProvider({ children }) {
  const [savedCards, setSavedCards] = useState([]);

  // Load saved cards from localStorage on initial load
  useEffect(() => {
    const storedCards = localStorage.getItem("savedBingoCards");
    if (storedCards) {
      try {
        setSavedCards(JSON.parse(storedCards));
      } catch (error) {
        console.error("Error parsing saved cards:", error);
        setSavedCards([]);
      }
    }
  }, []);

  // Save cards to localStorage whenever savedCards changes
  useEffect(() => {
    localStorage.setItem("savedBingoCards", JSON.stringify(savedCards));
  }, [savedCards]);

  // Function to save a new bingo card
  const saveCard = (cardDetails, squares) => {
    const newCard = {
      id: Date.now().toString(), // Simple ID generation
      cardDetails,
      squares,
      createdAt: new Date().toISOString(),
    };

    setSavedCards((prevCards) => [newCard, ...prevCards]);
    return newCard.id;
  };

  // Function to delete a saved card
  const deleteSavedCard = (cardId) => {
    setSavedCards((prevCards) =>
      prevCards.filter((card) => card.id !== cardId)
    );
  };

  // Function to get a specific card by ID
  const getCardById = (cardId) => {
    return savedCards.find((card) => card.id === cardId);
  };

  // Function to update an existing card
  const updateCard = (cardId, cardDetails, squares) => {
    setSavedCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId
          ? {
              ...card,
              cardDetails,
              squares,
              updatedAt: new Date().toISOString(),
            }
          : card
      )
    );
  };

  return (
    <SavedCardsContext.Provider
      value={{
        savedCards,
        saveCard,
        deleteSavedCard,
        getCardById,
        updateCard,
      }}
    >
      {children}
    </SavedCardsContext.Provider>
  );
}
