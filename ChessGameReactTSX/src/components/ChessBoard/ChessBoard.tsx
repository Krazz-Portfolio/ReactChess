import "./ChessBoard.css";

const ChessBoard = () => {
  const HORIZONTAL_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const VERTICAL_AXIS = ["1", "2", "3", "4", "5", "6", "7", "8"];

  let board = [];

  for (let row = VERTICAL_AXIS.length - 1; row >= 0; row--) {
    for (let col = 0; col < HORIZONTAL_AXIS.length; col++) {
      let color = (col + row) % 2 === 1 ? "white" : "black";
      board.push(
        <div key={`${row}-${col}`} className={`${color} square`}></div>
      );
    }
  }
  return <div className="chessboard">{board}</div>;
};

export default ChessBoard;
