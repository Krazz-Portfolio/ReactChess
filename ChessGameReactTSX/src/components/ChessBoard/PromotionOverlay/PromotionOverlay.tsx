import { Piece, PieceType } from "../../../types/types";
import "./PromotionOverlay.css";

interface Props {
  piece: Piece | null;
  onPromotion: (piece: Piece) => void;
}

export const PromotionOverlay = ({ piece, onPromotion }: Props) => {
  if (!piece) {
    return;
  }

  const handlePromotion = (newType: PieceType) => {
    const promotedPiece: Piece = {
      ...piece,
      type: newType,
    };

    onPromotion(promotedPiece);
  };

  return (
    <div className="promotion-options">
      <img
        src={`src/assets/pieces/queen_${
          piece.color === "white" ? "w" : "b"
        }.png`}
        onClick={() => handlePromotion(PieceType.QUEEN)}
        alt="Promote to Queen"
      ></img>
      <img
        src={`src/assets/pieces/knight_${
          piece.color === "white" ? "w" : "b"
        }.png`}
        onClick={() => handlePromotion(PieceType.KNIGHT)}
        alt="Promote to Knight"
      ></img>
      <img
        src={`src/assets/pieces/rook_${
          piece.color === "white" ? "w" : "b"
        }.png`}
        onClick={() => handlePromotion(PieceType.ROOK)}
        alt="Promote to Rook"
      ></img>
      <img
        src={`src/assets/pieces/bishop_${
          piece.color === "white" ? "w" : "b"
        }.png`}
        onClick={() => handlePromotion(PieceType.BISHOP)}
        alt="Promote to Bishop"
      ></img>
    </div>
  );
};
