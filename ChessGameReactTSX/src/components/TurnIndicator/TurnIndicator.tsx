import { PieceColor } from "../../types/types";

interface Props {
  currentTurn: PieceColor;
}

const TurnIndicator = ({ currentTurn }: Props) => {
  const capitalizedTurn =
    currentTurn.charAt(0).toUpperCase() + currentTurn.slice(1);

  return <h1>{capitalizedTurn}'s turn!</h1>;
};

export default TurnIndicator;
