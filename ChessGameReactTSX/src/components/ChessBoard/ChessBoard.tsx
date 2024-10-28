import "./ChessBoard.css";
import { HORIZONTAL_AXIS, VERTICAL_AXIS } from "../../data/constants/constants";
import { GameState, Piece, PieceColor, Position } from "../../data/types/types";
import { isAttackMove } from "../../utils/boardHelpers";
import { useRef, useState } from "react";
import { handleMouseMove } from "../../utils/mouseHandlers/handleMouseMove";
import { handleMouseDown } from "../../utils/mouseHandlers/handleMouseDown";
import { handleMouseUp } from "../../utils/mouseHandlers/handleMouseUp";
import { handlePromotion } from "../../utils/promotionHandler/promotionHandler";
import { WinnerOverlay } from "../WinnerOverlay/WinnerOverlay";
import { PromotionOverlay } from "./PromotionOverlay/PromotionOverlay";

interface Props {
  showPossibleMoves: boolean;
  gameState: GameState;
  setGameState: (value: GameState) => void;
}

const ChessBoard = ({ showPossibleMoves, gameState, setGameState }: Props) => {
  const chessboardRef = useRef<HTMLDivElement | null>(null);

  const [hoveredSquare, setHoveredSquare] = useState<Position>("");
  const [draggedPosition, setDraggedPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [promotionOverlay, setPromotionOverlay] = useState<PieceColor | null>(
    null
  );

  let boardUI = [];

  for (let row = VERTICAL_AXIS.length - 1; row >= 0; row--) {
    for (let col = 0; col < HORIZONTAL_AXIS.length; col++) {
      let color = (col + row) % 2 === 1 ? "white" : "black";
      const tileId = `${HORIZONTAL_AXIS[col]}${VERTICAL_AXIS[row]}`;
      const isSelected = gameState.selectedPiece?.position === tileId;
      const piece = gameState.board[VERTICAL_AXIS.length - row - 1][col];
      const isAPossibleMove = gameState.possibleMoves.some((move) =>
        move.startsWith(tileId)
      );
      const isPossibleAttackMove = isAPossibleMove
        ? isAttackMove(gameState.board, tileId)
        : false;

      boardUI.push(
        <div
          key={tileId}
          className={`${color} square${isSelected ? " selected" : ""} ${
            hoveredSquare === tileId ? "hovered" : ""
          } ${
            isPossibleAttackMove && showPossibleMoves
              ? "possible-attack-move"
              : isAPossibleMove && showPossibleMoves
              ? "possible-move"
              : ""
          }`}
          onMouseMove={
            gameState.selectedPiece
              ? (event) =>
                  handleMouseMove({
                    event,
                    chessboardRef,
                    gameState,
                    setGameState,
                    setHoveredSquare,
                    setDraggedPosition,
                  })
              : undefined
          }
          onMouseUp={() =>
            handleMouseUp({
              chessboardRef,
              gameState,
              setGameState,
              setHoveredSquare,
              draggedPosition,
              setPromotionOverlay,
            })
          }
        >
          {piece && (
            <div
              className={`piece ${isSelected ? "selected-piece" : ""}`}
              onMouseDown={(event) =>
                handleMouseDown({
                  piece,
                  event,
                  chessboardRef,
                  gameState,
                  setGameState,
                  setHoveredSquare,
                  setDraggedPosition,
                  setDragOffset,
                })
              }
              style={
                isSelected && draggedPosition
                  ? {
                      position: "absolute",
                      left: `${draggedPosition.x - dragOffset.x - 4}px`,
                      top: `${draggedPosition.y - dragOffset.y}px`,
                      zIndex: 1000,
                    }
                  : {}
              }
            >
              <img
                src={`src/assets/pieces/${piece.type}_${
                  piece.color === "white" ? "w" : "b"
                }.png`}
              ></img>
            </div>
          )}
        </div>
      );
    }
  }
  return (
    <div className="chessboard" ref={chessboardRef}>
      {boardUI}
      {gameState.winner && (
        <WinnerOverlay winner={gameState.winner} setGameState={setGameState} />
      )}
      {promotionOverlay && (
        <PromotionOverlay
          board={gameState.board}
          position={gameState.previousMove.to}
          onPromotion={(piece: Piece) =>
            handlePromotion({
              piece,
              gameState,
              setGameState,
              setPromotionOverlay,
            })
          }
        />
      )}
    </div>
  );
};

export default ChessBoard;
