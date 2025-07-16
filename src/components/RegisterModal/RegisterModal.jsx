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
  const { handleLogin } = useContext(CurrentUserContext);
  const {
    isRegisterModalOpen,
    closeRegisterModal,
    openRegisterSuccessModal,
    closeRegisterSuccessModal,
  } = useContext(ModalContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      // Handle registration error - you might want to show an error message
    }
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
