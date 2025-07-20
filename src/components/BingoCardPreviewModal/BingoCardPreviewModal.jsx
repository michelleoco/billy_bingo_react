import { useState, useEffect } from "react";
import "./BingoCardPreviewModal.css";

function BingoCardPreviewModal({ card, onClose, onSave, onEdit }) {
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(card);
      onClose();
    } catch (error) {
      console.error("Error saving card:", error);
      alert("Error saving card. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No date specified";
    return dateString;
  };

  return (
    <div className="preview-modal">
      <div className="preview-modal__overlay" onClick={onClose}></div>
      <div className="preview-modal__content">
        <div className="preview-modal__header">
          <h2 className="preview-modal__title">Bingo Card Preview</h2>
          <button
            className="preview-modal__close"
            onClick={onClose}
            aria-label="Close preview"
          >
            ×
          </button>
        </div>

        <div className="preview-modal__body">
          <div className="preview-card__details">
            <h3 className="preview-card__name">{card.cardDetails.name}</h3>
            <div className="preview-card__info">
              <p className="preview-card__date">
                <strong>Date:</strong> {formatDate(card.cardDetails.date)}
              </p>
              <p className="preview-card__venue">
                <strong>Venue:</strong>{" "}
                {card.cardDetails.venue || "No venue specified"}
              </p>
            </div>
          </div>

          <div className="preview-card__bingo">
            <div className="preview-card__grid">
              {card.squares.map((square, index) => (
                <div key={index} className="preview-card__square">
                  {index === 12 ? (
                    <span className="preview-card__free">FREE</span>
                  ) : (
                    square || `Square ${index + 1}`
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="preview-modal__footer">
          {onEdit && (
            <button
              className="preview-modal__button preview-modal__button--secondary"
              onClick={onEdit}
              disabled={isSaving}
            >
              Edit Card
            </button>
          )}
          <button
            className="preview-modal__button preview-modal__button--primary"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Card"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BingoCardPreviewModal;
