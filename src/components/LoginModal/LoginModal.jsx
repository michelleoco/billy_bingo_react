import "./LoginModal.css";
import { useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { ModalContext } from "../../contexts/ModalContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useContext(CurrentUserContext);
  const { isLoginModalOpen, closeLoginModal } = useContext(ModalContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin({ email, password });
      closeLoginModal();
      resetForm();
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <ModalWithForm
      title="Log in"
      name="login"
      buttonText="Log in"
      isOpen={isLoginModalOpen}
      onClose={closeLoginModal}
      onSubmit={handleSubmit}
    >
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
    </ModalWithForm>
  );
}

export default LoginModal;
