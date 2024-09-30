import "./ChessBoard.css";
import { useEffect, useState } from "react";
import { initializeBoard } from "../../utils/initializeBoard";
import { Board } from "../../types/types";

const ChessBoard = () => {
  const HORIZONTAL_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const VERTICAL_AXIS = ["1", "2", "3", "4", "5", "6", "7", "8"];

  const [board, setBoard] = useState<Board>(initializeBoard()); // Initialize board state

  console.log("hej");
  console.log(board);

  let boardUI = [];

  for (let row = VERTICAL_AXIS.length - 1; row >= 0; row--) {
    for (let col = 0; col < HORIZONTAL_AXIS.length; col++) {
      let color = (col + row) % 2 === 1 ? "white" : "black";
      const tileId = `${HORIZONTAL_AXIS[col]}${VERTICAL_AXIS[row]}`;

      const piece = board[row][col];

      boardUI.push(
        <div key={tileId} className={`${color} square`}>
          {piece && (
            <div className="piece">
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
  return <div className="chessboard">{boardUI}</div>;
};

export default ChessBoard;
