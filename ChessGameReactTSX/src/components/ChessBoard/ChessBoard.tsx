import "./ChessBoard.css";
import { useEffect, useRef, useState } from "react";
import { initializeBoard } from "../../utils/initializeBoard";
import {
  Board,
  GameState,
  Piece,
  PieceColor,
  PieceType,
} from "../../types/types";

const ChessBoard = () => {
  const HORIZONTAL_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const VERTICAL_AXIS = ["1", "2", "3", "4", "5", "6", "7", "8"];

  const [gameState, setGameState] = useState<GameState>(() => ({
    board: initializeBoard(),
    currentTurn: PieceColor.WHITE,
    selectedPiece: null,
    possibleMoves: [],
    previousMove: { from: "", to: "" },
  }));

  const [draggedPosition, setDraggedPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const chessboardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (piece: Piece, event: React.MouseEvent) => {
    event.preventDefault();
    console.log("Mouse down");
    if (gameState.selectedPiece === piece) {
      setGameState({
        ...gameState,
        selectedPiece: null,
      });
    } else {
      console.log("test");

      setGameState({
        ...gameState,
        selectedPiece: piece,
      });

      setDraggedPosition({ x: event.clientX, y: event.clientY });
    }
  };

  console.log("re render");
  console.log(gameState);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (gameState.selectedPiece) {
      console.log("dragged position");
      setDraggedPosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseUp = () => {
    //console.log("Mouse up");
    const chessboard = chessboardRef.current;

    const selectedPiece = gameState.selectedPiece;

    if (chessboard && draggedPosition && selectedPiece) {
      const boardStartHorizontal = chessboard?.offsetLeft;
      const boardStartVertical = chessboard?.offsetTop;
      const horizontalTileIndex = Math.floor(
        (draggedPosition.x - boardStartHorizontal) /
          (chessboard.clientWidth / 8)
      );
      const verticalTileIndex = Math.floor(
        (draggedPosition.y - boardStartVertical) / (chessboard.clientWidth / 8)
      );
      const position = `${HORIZONTAL_AXIS[horizontalTileIndex]}${
        VERTICAL_AXIS[VERTICAL_AXIS.length - 1 - verticalTileIndex]
      }`;

      if (selectedPiece.position !== position) {
        setGameState((prevState) => {
          console.log(prevState);
          const newBoard = prevState.board.map((row) => [...row]);
          const oldPosition = selectedPiece.position;
          const updatedPiece = { ...selectedPiece, position: position };

          newBoard[verticalTileIndex][horizontalTileIndex] = updatedPiece;
          newBoard[VERTICAL_AXIS.length - parseInt(oldPosition[1])][
            HORIZONTAL_AXIS.indexOf(oldPosition[0])
          ] = null;

          console.log(newBoard);

          const switchTurn =
            prevState.currentTurn === PieceColor.WHITE
              ? PieceColor.BLACK
              : PieceColor.WHITE;
          return {
            ...prevState,
            board: newBoard,
            selectedPiece: null,
            previousMove: { from: oldPosition, to: position },
            currentTurn: switchTurn,
          };
        });
      } else {
        setGameState({
          ...gameState,
          selectedPiece: null,
        });
      }
    }
  };
  // console.log("Updated Game State:", gameState); // Log the entire game state
  // console.log(board);
  //onMouseMove={(event) => handleMouseMove(event)}
  // console.log("TRASH");

  let boardUI = [];

  for (let row = VERTICAL_AXIS.length - 1; row >= 0; row--) {
    for (let col = 0; col < HORIZONTAL_AXIS.length; col++) {
      let color = (col + row) % 2 === 1 ? "white" : "black";
      const tileId = `${HORIZONTAL_AXIS[col]}${VERTICAL_AXIS[row]}`;
      const isSelected = gameState.selectedPiece?.position === tileId;
      const piece = gameState.board[VERTICAL_AXIS.length - row - 1][col];
      boardUI.push(
        <div
          key={tileId}
          className={`${color} square${isSelected ? " selected" : ""}`}
          onMouseMove={
            gameState.selectedPiece
              ? (event) => handleMouseMove(event)
              : undefined
          }
          onMouseUp={handleMouseUp}
        >
          {piece && (
            <div
              className={`piece ${isSelected ? "selected-piece" : ""}`}
              onMouseDown={(event) => handleMouseDown(piece, event)}
              style={
                isSelected && draggedPosition
                  ? {
                      position: "absolute", // Set position to absolute when dragging
                      left: `${draggedPosition.x - 35}px`, // Adjusting the piece's position relative to the cursor
                      top: `${draggedPosition.y - 35}px`, // Adjusting the piece's position relative to the cursor
                      // pointerEvents: "none", // Allow the piece to be dragged without interference
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
    </div>
  );
};

export default ChessBoard;
