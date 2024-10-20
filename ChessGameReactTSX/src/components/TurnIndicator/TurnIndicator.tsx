import { PieceColor } from "../../types/types";
import "./TurnIndicator.css";

interface Props {
  currentTurn: PieceColor;
}

const TurnIndicator = ({ currentTurn }: Props) => {
  const capitalizedTurn =
    currentTurn.charAt(0).toUpperCase() + currentTurn.slice(1);

  return <h1 className="turn-indicator">{capitalizedTurn}'s turn!</h1>;
};

export default TurnIndicator;
