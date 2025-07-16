import "./Create.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import BingoCard from "../BingoCard/BingoCard";

function Create() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <main className="create">
      <BingoCard />
    </main>
  );
}

export default Create;
