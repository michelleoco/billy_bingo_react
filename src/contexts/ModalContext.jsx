import { createContext, useState } from "react";

export const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isRegisterSuccessModalOpen, setIsRegisterSuccessModalOpen] =
    useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
    setIsRegisterSuccessModalOpen(false);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
    setIsRegisterSuccessModalOpen(false);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const openRegisterSuccessModal = () => {
    setIsRegisterSuccessModalOpen(true);
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(false);
  };

  const closeRegisterSuccessModal = () => {
    setIsRegisterSuccessModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isLoginModalOpen,
        isRegisterModalOpen,
        isRegisterSuccessModalOpen,
        openLoginModal,
        closeLoginModal,
        openRegisterModal,
        closeRegisterModal,
        openRegisterSuccessModal,
        closeRegisterSuccessModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
