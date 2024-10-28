import { PieceColor } from "../../data/types/types";
import "./WinnerOverlay.css";

interface Props {
  winner: PieceColor;
}

export const WinnerOverlay = ({ winner }: Props) => {
  const capitalizedWinner = winner.charAt(0).toUpperCase() + winner.slice(1);
  return (
    <div className="overlay">
      <div className="message">{capitalizedWinner + " Wins!"}</div>
    </div>
  );
};
