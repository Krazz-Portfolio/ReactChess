import { HORIZONTAL_AXIS, VERTICAL_AXIS } from "../../Constants";
import { Board, Piece, PieceColor, Position } from "../../types/types";

export const isValidPawnMove = (piece: Piece, oldPosition: Position, board: Board, previousMove: {from: Position, to: Position}) :
Boolean | undefined | {isValid: boolean; isEnPassant: boolean} => {

    const team = piece.color;
    const enemyTeam = piece.color === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE;

    // if standing on initial position, isStandingOnStart is true.
    const isStandingOnStart = piece.color === PieceColor.WHITE && oldPosition[1] === "2" ? true : 
    piece.color === PieceColor.BLACK && oldPosition[1] === "7" ? true : 
    false;

    const isPreviousMoveFromStart = enemyTeam === PieceColor.WHITE && previousMove.from[1] === "2" ? true : 
    enemyTeam === PieceColor.BLACK && previousMove.from[1] === "7" ? true : 
    false;

    const oldY = parseInt(oldPosition[1]);
    const oldX = oldPosition[0].charCodeAt(0);

    const newY = parseInt(piece.position[1]);
    const newX = piece.position[0].charCodeAt(0);

    const verticalSquaresMoved = Math.abs(newY - oldY)
    const horizontalSquaresMoved = Math.abs(newX - oldX)

    const pieceInTheWay = board[VERTICAL_AXIS.length - parseInt(piece.position[1])][HORIZONTAL_AXIS.indexOf(piece.position[0])];;

    const prevMoveVerticalSquares = Math.abs(parseInt(previousMove.from[1]) - parseInt(previousMove.to[1]))

    const inBetweenStartAndMove = previousMove.from[0] + (parseInt(previousMove.from[1]) + (team === PieceColor.WHITE ? -1 : 1))

    const isEnPassant = piece.position === inBetweenStartAndMove ? true : false;

    console.log(inBetweenStartAndMove)

    

    if (team === PieceColor.WHITE ? newY > oldY : newY < oldY) {

        if (newX === oldX) {

            if (verticalSquaresMoved === 1 && !pieceInTheWay) {
                return true;
            } else if (isStandingOnStart && verticalSquaresMoved === 2 && !pieceInTheWay) {
                return true;
            }
        } else if (horizontalSquaresMoved === 1 && verticalSquaresMoved === 1 && pieceInTheWay && pieceInTheWay.color === enemyTeam) {
            return true;
        }

        else if (
            horizontalSquaresMoved === 1 && 
            verticalSquaresMoved === 1 && 
            !pieceInTheWay && 
            isPreviousMoveFromStart && 
            prevMoveVerticalSquares === 2 && 
            isEnPassant) 
            {
                return {isValid: true, isEnPassant: true};
        }
    }
    else {
        return false;
    }
    return false;
}