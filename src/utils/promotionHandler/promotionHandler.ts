import { HORIZONTAL_AXIS, VERTICAL_AXIS } from "../../data/constants/Constants";
import { GameState, Piece, PieceColor } from "../../data/types/types";
import { validateIfCheckmate, validateKingInDanger } from "../../game/MoveValidator";

interface HandlePromotionProps {
    piece: Piece;
    gameState: GameState;
    setGameState: (value: GameState) => void;
    setPromotionOverlay: (value: PieceColor | null) => void;
}

export const handlePromotion = ({piece, gameState, setGameState, setPromotionOverlay} : HandlePromotionProps) => {
    const newX = HORIZONTAL_AXIS.indexOf(piece.position[0]);
    const newY = VERTICAL_AXIS.length - parseInt(piece.position[1]);

    const newBoard = gameState.board.map((row) => [...row]);

    newBoard[newY][newX] = piece;

    const switchTurn =
      gameState.currentTurn === PieceColor.WHITE
        ? PieceColor.BLACK
        : PieceColor.WHITE;

    const isEnemyKingInDanger = validateKingInDanger(
      newBoard,
      piece.color === PieceColor.BLACK ? PieceColor.WHITE : PieceColor.BLACK
    );

    if (isEnemyKingInDanger) {
      const isCheckmate = validateIfCheckmate(
        newBoard,
        piece.color === PieceColor.BLACK ? PieceColor.WHITE : PieceColor.BLACK
      );
      if (isCheckmate) {
        setGameState({
            ...gameState,
            board: newBoard,
            winner: piece.color,
        })
      }
    } else {
        setGameState({
            ...gameState,
            board: newBoard,
            currentTurn: switchTurn,
          });
    }
    setPromotionOverlay(null);
};