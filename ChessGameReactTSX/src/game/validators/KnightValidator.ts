import { HORIZONTAL_AXIS, VERTICAL_AXIS } from "../../Constants";
import { Board, PieceColor, Position } from "../../types/types"

export const getPossibleKnightMoves = (team: PieceColor, board: Board, oldPosition: Position) => {

    let possibleMoves: string[] = []

    const enemyTeam = team === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE;

    const coordinateY =  VERTICAL_AXIS.length - parseInt(oldPosition[1]);

    const coordinateX = HORIZONTAL_AXIS.indexOf(String.fromCharCode(oldPosition[0].charCodeAt(0)));

    const moves = [
        [-1, 2], [1, 2], 
        [-2, 1], [2, 1],
        [-2, -1], [2, -1],
        [-1, -2], [1, -2]
    ];

    const reversedMoves = moves.map(([y, x]) => [-y, x]);

    moves.forEach((move, index) => {

        if(coordinateY + reversedMoves[index][0] > 7 || coordinateY + reversedMoves[index][0] < 0 || coordinateX + move[1] > 7 || coordinateX + move[1] < 0) {
            return;
        } else if (board[coordinateY + reversedMoves[index][0]][coordinateX + move[1]] === null) {
            possibleMoves.push(String.fromCharCode(oldPosition[0].charCodeAt(0) + move[1]) + (parseInt(oldPosition[1]) + move[0]).toString())
        } else if (board[coordinateY + reversedMoves[index][0]][coordinateX + move[1]]?.color === enemyTeam) {
            possibleMoves.push(String.fromCharCode(oldPosition[0].charCodeAt(0) + move[1]) + (parseInt(oldPosition[1]) + move[0]).toString())
        }
    });
    console.log(possibleMoves);
    return possibleMoves;
    
}