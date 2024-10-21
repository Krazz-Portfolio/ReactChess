import "./ChessBoard.css";
import { useRef, useState } from "react";
import { initializeBoard } from "../../utils/initializeBoard";
import { GameState, Piece, PieceColor, Position } from "../../types/types";
import {
  checkIfCheckmate,
  getPossibleMoves,
  isValidMove,
  validateKingInDanger,
} from "../../game/MoveValidator";
import { HORIZONTAL_AXIS, VERTICAL_AXIS } from "../../Constants";
import { WinnerOverlay } from "../WinnerOverlay/WinnerOverlay";

interface Props {
  showPossibleMoves: boolean;
  setCurrentTurn: (value: PieceColor) => void;
}

const ChessBoard = ({ showPossibleMoves, setCurrentTurn }: Props) => {
  const [gameState, setGameState] = useState<GameState>(() => ({
    board: initializeBoard(),
    currentTurn: PieceColor.WHITE,
    selectedPiece: null,
    possibleMoves: [],
    previousMove: { from: "", to: "" },
  }));

  const [hoveredSquare, setHoveredSquare] = useState<Position>("");

  const [draggedPosition, setDraggedPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const [winner, setWinner] = useState<PieceColor | null>(null);

  const chessboardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (piece: Piece, event: React.MouseEvent) => {
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
        const possibleMoves = getPossibleMoves(
          piece,
          piece.position,
          gameState.board,
          gameState.previousMove
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
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (gameState.selectedPiece && chessboardRef.current) {
      const chessboard = chessboardRef.current;

      const boardStartHorizontal = chessboard.offsetLeft;
      const boardStartVertical = chessboard.offsetTop;
      const boardEndHorizontal = chessboard.clientWidth + boardStartHorizontal;
      const boardEndVertical = chessboard.clientHeight + boardStartVertical;

      if (
        event.clientX > boardEndHorizontal - 20 ||
        event.clientX < boardStartHorizontal + 20 ||
        event.clientY > boardEndVertical - 20 ||
        event.clientY < boardStartVertical + 28
      ) {
        setHoveredSquare("");
        setGameState({
          ...gameState,
          selectedPiece: null,
          possibleMoves: [],
        });
        return;
      }

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

      setDraggedPosition({
        x: event.clientX - boardStartHorizontal,
        y: event.clientY - boardStartVertical,
      });
    }
  };

  const handleMouseUp = () => {
    const chessboard = chessboardRef.current;

    const selectedPiece = gameState.selectedPiece;

    if (chessboard && draggedPosition && selectedPiece) {
      const horizontalTileIndex = Math.floor(
        draggedPosition.x / (chessboard.clientWidth / 8)
      );

      const verticalTileIndex = Math.floor(
        draggedPosition.y / (chessboard.clientHeight / 8)
      );

      const position = `${HORIZONTAL_AXIS[horizontalTileIndex]}${
        VERTICAL_AXIS[VERTICAL_AXIS.length - 1 - verticalTileIndex]
      }`;

      if (selectedPiece.position !== position) {
        const oldPosition = selectedPiece.position;
        const updatedPiece = { ...selectedPiece, position: position };

        let isValid = isValidMove(
          updatedPiece,
          oldPosition,
          gameState.board,
          gameState.previousMove,
          gameState.possibleMoves
        );

        let isEnPassant = false;
        let isCastle = false;

        if (
          typeof isValid === "object" &&
          isValid !== null &&
          "isValid" in isValid
        ) {
          isCastle = isValid.isCastle;
          isEnPassant = isValid.isEnPassant;
          isValid = isValid.isValid;
        }

        if (isValid) {
          const newBoard = gameState.board.map((row) => [...row]);

          updatedPiece.hasMoved = true;

          if (isCastle) {
            const rookX =
              HORIZONTAL_AXIS.indexOf(updatedPiece.position[0]) > 4 ? 7 : 0;
            const newRookX = rookX === 7 ? 5 : 3;
            const newKingX =
              HORIZONTAL_AXIS.indexOf(updatedPiece.position[0]) > 4 ? 6 : 2;

            const rookToBeMoved = newBoard[verticalTileIndex][rookX];

            if (rookToBeMoved) {
              rookToBeMoved.position =
                HORIZONTAL_AXIS[newRookX] + rookToBeMoved.position[1];

              newBoard[verticalTileIndex][newRookX] = rookToBeMoved;

              newBoard[verticalTileIndex][rookX] = null;
            }

            updatedPiece.position =
              HORIZONTAL_AXIS[newKingX] + updatedPiece.position[1];

            newBoard[verticalTileIndex][newKingX] = updatedPiece;
          } else {
            newBoard[verticalTileIndex][horizontalTileIndex] = updatedPiece;
          }

          if (isEnPassant) {
            newBoard[VERTICAL_AXIS.length - parseInt(oldPosition[1])][
              HORIZONTAL_AXIS.indexOf(updatedPiece.position[0])
            ] = null;
          }

          newBoard[VERTICAL_AXIS.length - parseInt(oldPosition[1])][
            HORIZONTAL_AXIS.indexOf(oldPosition[0])
          ] = null;

          const isKingInDanger = validateKingInDanger(
            newBoard,
            selectedPiece.color
          );

          if (!isKingInDanger) {
            const switchTurn =
              gameState.currentTurn === PieceColor.WHITE
                ? PieceColor.BLACK
                : PieceColor.WHITE;

            const isEnemyKingInDanger = validateKingInDanger(
              newBoard,
              selectedPiece.color === PieceColor.BLACK
                ? PieceColor.WHITE
                : PieceColor.BLACK
            );

            //console.log(isEnemyKingInDanger);
            if (isEnemyKingInDanger) {
              const isCheckmate = checkIfCheckmate(
                newBoard,
                selectedPiece.color === PieceColor.BLACK
                  ? PieceColor.WHITE
                  : PieceColor.BLACK
              );
              console.log(isCheckmate); // SOMEONE WON
              if (isCheckmate) {
                setWinner(selectedPiece.color);
              }
            }

            setGameState({
              ...gameState,
              board: newBoard,
              selectedPiece: null,
              previousMove: { from: oldPosition, to: position },
              currentTurn: switchTurn,
              possibleMoves: [],
            });

            setCurrentTurn(switchTurn);
          } else {
            return {
              ...gameState,
              selectedPiece: null,
              possibleMoves: [],
            };
          }
        } else {
          // Move is invalid
          setGameState({
            ...gameState,
            selectedPiece: null,
            possibleMoves: [],
          });
        }
      } else {
        // Standing on the same spot as before
        setGameState({
          ...gameState,
          selectedPiece: null,
          possibleMoves: [],
        });
      }
    }
    setHoveredSquare("");
  };

  function idToBoardCoordinates(tileId: string) {
    const x = HORIZONTAL_AXIS.indexOf(tileId[0]);
    const y = VERTICAL_AXIS.length - parseInt(tileId[1]);

    return [y, x];
  }

  function isAttackMove(tileId: string) {
    const coordinates = idToBoardCoordinates(tileId);

    if (gameState.board[coordinates[0]][coordinates[1]] !== null) {
      return true;
    } else {
      return false;
    }
  }

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
        ? isAttackMove(tileId)
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
      {winner && <WinnerOverlay winner={winner} />}
    </div>
  );
};

export default ChessBoard;
