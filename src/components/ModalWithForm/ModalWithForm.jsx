import { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  title,
  name,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  children,
}) {
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container">
        <button type="button" className="modal__close" onClick={onClose}>
          &#10005;
        </button>
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" name={name} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="modal__button">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
