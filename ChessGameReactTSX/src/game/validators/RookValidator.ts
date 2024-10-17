import { HORIZONTAL_AXIS, VERTICAL_AXIS } from "../../Constants";
import { Board, PieceColor, Position } from "../../types/types";

export const getPossibleRookMoves = (team: PieceColor, board: Board, oldPosition: Position) => {

    let possibleMoves: string[] = []

    const enemyTeam = team === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE;

    const coordinateY =  VERTICAL_AXIS.length - parseInt(oldPosition[1]);

    const coordinateX = HORIZONTAL_AXIS.indexOf(String.fromCharCode(oldPosition[0].charCodeAt(0)));

    const directions = [
        {x: 0, y: 1}, // Board: Down
        {x: 1, y: 0}, // Board: Right
        {x: 0, y: -1}, // Board: Up
        {x: -1, y: 0} // BOard: Left
    ];

    directions.forEach(direction => {

        for(let i = 1; i < 8; i++) {

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