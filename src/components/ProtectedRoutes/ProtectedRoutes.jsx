import { useContext, useEffect, useRef } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { ModalContext } from "../../contexts/ModalContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(CurrentUserContext);
  const { openLoginModal } = useContext(ModalContext);
  const wasLoggedInRef = useRef(isLoggedIn);

  useEffect(() => {
    // Only open login modal if user was never logged in when accessing this route
    // Don't open it if they were logged in and then logged out (logout scenario)
    if (!isLoggedIn && !wasLoggedInRef.current) {
      openLoginModal();
    }

    // Update the ref to track the current login state
    wasLoggedInRef.current = isLoggedIn;
  }, [isLoggedIn, openLoginModal]);

  return isLoggedIn ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
