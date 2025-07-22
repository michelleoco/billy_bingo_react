import "./RegisterModal.css";
import { useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { ModalContext } from "../../contexts/ModalContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { registerUser } from "../../utils/userApi";

function RegisterModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { handleLogin } = useContext(CurrentUserContext);
  const {
    isRegisterModalOpen,
    closeRegisterModal,
    openRegisterSuccessModal,
    closeRegisterSuccessModal,
  } = useContext(ModalContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errorMessage) setErrorMessage(""); // Clear error when user starts typing
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errorMessage) setErrorMessage(""); // Clear error when user starts typing
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (errorMessage) setErrorMessage(""); // Clear error when user starts typing
  };

  const handleCloseModal = () => {
    resetForm();
    closeRegisterModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error messages

    try {
      // Register the user with the API
      await registerUser({ name, email, password });

      // Show success modal
      openRegisterSuccessModal();

      // After 2 seconds, log the user in and close the modal
      setTimeout(async () => {
        try {
          await handleLogin({ email, password });
          closeRegisterSuccessModal();
          resetForm();
        } catch (error) {
          console.error("Error logging in after registration:", error);
          closeRegisterSuccessModal();
          resetForm();
        }
      }, 2000);
    } catch (error) {
      console.error("Error registering user:", error);
      setErrorMessage(
        error.message || "Registration failed. Please try again."
      );
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setErrorMessage("");
  };

  return (
    <ModalWithForm
      title="Create your profile"
      name="register"
      buttonText="Create profile"
      isOpen={isRegisterModalOpen}
      onClose={handleCloseModal}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Username
        <input
          className="modal__input"
          type="text"
          placeholder="Username"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </label>
      <label className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>
      {errorMessage && <p className="modal__error">{errorMessage}</p>}
    </ModalWithForm>
  );
}

export default RegisterModal;
