import { RefObject } from "react";
import { GameState, Piece } from "../../data/types/types";
import { getPossibleMoves, validateKingInDanger } from "../../game/MoveValidator";
import { HORIZONTAL_AXIS, VERTICAL_AXIS } from "../../data/constants/constants";

interface HandleMouseMoveProps {
    piece: Piece;
    event: React.MouseEvent;
    chessboardRef: RefObject<HTMLDivElement>;
    gameState: GameState;
    setGameState: (value: GameState) => void;
    setHoveredSquare: (value: string) => void;
    setDraggedPosition: (value: {x: number, y: number}) => void;
    setDragOffset: (value: {x: number, y: number}) => void;
}

export const handleMouseDown = ({piece, event, chessboardRef, gameState, setGameState, setHoveredSquare, setDraggedPosition, setDragOffset} : HandleMouseMoveProps) => {
  event.preventDefault();
  const chessboard = chessboardRef.current;

  if (chessboard) {
    const boardStartHorizontal = chessboard.offsetLeft;
    const boardStartVertical = chessboard.offsetTop;

    if (gameState.selectedPiece === piece) {
      setGameState({
        ...gameState,
        selectedPiece: null,
      });
    } else {
      if(piece.color === gameState.currentTurn) {
        const isOwnKingInDanger = validateKingInDanger(gameState.board, piece.color);

        const possibleMoves = getPossibleMoves(
          piece,
          piece.position,
          gameState.board,
          gameState.previousMove,
          isOwnKingInDanger,
        );

        setGameState({
          ...gameState,
          selectedPiece: piece,
          possibleMoves: possibleMoves,
        });

        setDraggedPosition({
          x: event.clientX - boardStartHorizontal,
          y: event.clientY - boardStartVertical,
        });

        // This is functionality to show that you are hovering over a square.
        const hoveredX = Math.floor(
          (event.clientX - boardStartHorizontal) / (chessboard.clientWidth / 8)
        );
        const hoveredY = Math.floor(
          (event.clientY - boardStartVertical) / (chessboard.clientHeight / 8)
        );

        const xAxis = HORIZONTAL_AXIS[hoveredX];
        const yAxis = VERTICAL_AXIS[VERTICAL_AXIS.length - hoveredY - 1];
        setHoveredSquare(xAxis.toString() + yAxis.toString());
        // --------------

        // To make sure the pointer is on the middle of the piece.
        const target = event.currentTarget as HTMLElement;
        const offsetX = target.clientWidth / 2;
        const offsetY = target.clientHeight / 2;

        setDragOffset({ x: offsetX, y: offsetY });
      }
      
    }
  }
};
