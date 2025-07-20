import "./RegisterSuccessModal.css";
import { useContext, useEffect } from "react";
import { ModalContext } from "../../contexts/ModalContext";

function RegisterSuccessModal() {
  const { isRegisterSuccessModalOpen, closeRegisterSuccessModal } =
    useContext(ModalContext);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && isRegisterSuccessModalOpen) {
        closeRegisterSuccessModal();
      }
    };

    if (isRegisterSuccessModalOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isRegisterSuccessModalOpen, closeRegisterSuccessModal]);

  return (
    <div
      className={`modal ${isRegisterSuccessModalOpen ? "modal_opened" : ""}`}
    >
      <div className="modal__container">
        <button
          type="button"
          className="modal__close"
          onClick={closeRegisterSuccessModal}
        >
          &#10005;
        </button>
        <h2 className="modal__title">Registration successfully completed!</h2>
        <p className="modal__message">
          You have successfully registered and logged in.
        </p>
      </div>
    </div>
  );
}

export default RegisterSuccessModal;
