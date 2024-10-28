import { HORIZONTAL_AXIS, VERTICAL_AXIS } from "../../data/constants/constants";
import { Board, PieceColor, Position } from "../../data/types/types";


export const getPossibleBishopMoves = (team: PieceColor, board: Board, oldPosition: Position) => {

    let possibleMoves: string[] = []

    const enemyTeam = team === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE;

    const coordinateY =  VERTICAL_AXIS.length - parseInt(oldPosition[1]);
    const coordinateX = HORIZONTAL_AXIS.indexOf(String.fromCharCode(oldPosition[0].charCodeAt(0)));

    const directions = [
        { x: 1, y: 1 },  // Top-right, Board: Bottom-right
        { x: -1, y: 1 }, // Top-left, Board: Bottom-left
        { x: 1, y: -1 }, // Bottom-right, Board: Top-right
        { x: -1, y: -1 } // Bottom-left, Board: Top-Left
    ];
    directions.forEach(direction => {
        for( let i = 1; i < 8; i++) {

            const newX = coordinateX + i * direction.x;
            const newY = coordinateY + i * direction.y;

            const posX = HORIZONTAL_AXIS[newX];
            const posY = VERTICAL_AXIS.length - newY;

            if(newY > 7 || newX > 7 || newY < 0 || newX < 0) {
                break;
            }

            if (board[newY][newX] === null) {
                possibleMoves.push(posX + posY);

            } else if (board[newY][newX] !== null && board[newY][newX].color === enemyTeam) {
                possibleMoves.push(posX + posY);
                break;
            } else {
                break;
            }

        }

    });
    return possibleMoves;
}