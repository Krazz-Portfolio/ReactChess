import { GameState, PieceColor } from "../../data/types/types";
import { handleRestart } from "../../utils/gameFeatureHandlers/handleRestart";
import "./WinnerOverlay.css";

interface Props {
  winner: PieceColor;
  setGameState: (value: GameState) => void;
}

export const WinnerOverlay = ({ winner, setGameState }: Props) => {
  const capitalizedWinner = winner.charAt(0).toUpperCase() + winner.slice(1);
  return (
    <div className="overlay">
      <div className="message">
        {capitalizedWinner + " Wins!"}
        <h5 onClick={() => handleRestart({ setGameState })}>Start over!</h5>
      </div>
    </div>
  );
};
