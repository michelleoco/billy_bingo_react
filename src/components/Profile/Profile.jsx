import "./Profile.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import BingoCard from "../BingoCard/BingoCard";

function Profile() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <main className="profile">
      <BingoCard />
    </main>
  );
}

export default Profile;
