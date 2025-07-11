import "./RegisterModal.css";
import { useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { ModalContext } from "../../contexts/ModalContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { handleLogin } = useContext(CurrentUserContext);
  const { isRegisterModalOpen, closeRegisterModal, openRegisterSuccessModal } =
    useContext(ModalContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would make an API call to register the user
    // and then log them in
    openRegisterSuccessModal();
    setTimeout(() => {
      handleLogin({ email, name });
      resetForm();
    }, 2000);
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <>
      <ModalWithForm
        title="Create your profile"
        name="register"
        buttonText="Create profile"
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
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
      </ModalWithForm>
    </>
  );
}

export default RegisterModal;
