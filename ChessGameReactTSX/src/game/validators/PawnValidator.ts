import { HORIZONTAL_AXIS, VERTICAL_AXIS } from "../../Constants";
import { Board, Piece, PieceColor, PieceType, Position } from "../../types/types";

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

    // console.log(inBetweenStartAndMove)

    

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

export const getPossiblePawnMoves = (team: PieceColor, board: Board, oldPosition: Position, previousMove: {from: Position, to: Position}) => {

    let possibleMoves: string[] = []

    // if standing on initial position, isStandingOnStart is true.
    const isStandingOnStart = team === PieceColor.WHITE && oldPosition[1] === "2" ? true : 
    team === PieceColor.BLACK && oldPosition[1] === "7" ? true : 
    false;

    const enemyTeam = team === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE;

    const coordinateY =  VERTICAL_AXIS.length - parseInt(oldPosition[1]);

    const coordinateX = HORIZONTAL_AXIS.indexOf(String.fromCharCode(oldPosition[0].charCodeAt(0)));

    const direction = team === PieceColor.WHITE ? -1 : 1;

    const oneStepY = coordinateY + (1 * direction);
    const twoStepsY = coordinateY + (2 * direction);

    const oneStepRight = coordinateX + 1;
    const oneStepLeft = coordinateX - 1;

    if (oneStepY < 8 && oneStepY >= 0 && board[oneStepY][coordinateX] === null) {
        const validMove = (HORIZONTAL_AXIS[coordinateX]) + (VERTICAL_AXIS.length - oneStepY);
        possibleMoves.push(validMove)

        if (isStandingOnStart && board[twoStepsY][coordinateX] === null) {
            const validMove = (HORIZONTAL_AXIS[coordinateX]) + (VERTICAL_AXIS.length - twoStepsY);
            possibleMoves.push(validMove)
        }
    } 

    if(oneStepY < 8 && oneStepY >= 0 && oneStepLeft >= 0 && oneStepRight < 8) {
        if (board[oneStepY][oneStepLeft] !== null && board[oneStepY][oneStepLeft].color === enemyTeam) {
            const validMove = (HORIZONTAL_AXIS[oneStepLeft]) + (VERTICAL_AXIS.length - oneStepY);
            possibleMoves.push(validMove)
        }
    
        if (board[oneStepY][oneStepRight] !== null && board[oneStepY][oneStepRight].color === enemyTeam) {
            const validMove = (HORIZONTAL_AXIS[oneStepRight]) + (VERTICAL_AXIS.length - oneStepY);
            possibleMoves.push(validMove)
        }
    }

    if (previousMove.from !== '') {
        const prevFromCoordinateY =  VERTICAL_AXIS.length - parseInt(previousMove.from[1]);

        const prevToCoordinateY =  VERTICAL_AXIS.length - parseInt(previousMove.to[1]);
        const prevToCoordinateX = HORIZONTAL_AXIS.indexOf(String.fromCharCode(previousMove.to[0].charCodeAt(0)));

        const wasFromStartingPosition = (prevFromCoordinateY === 1 && enemyTeam === PieceColor.BLACK) || (prevFromCoordinateY === 6 && enemyTeam === PieceColor.WHITE);
        const movedTwoSteps = (Math.abs(prevFromCoordinateY - prevToCoordinateY) === 2);

        const standingInPosition = (coordinateY === prevToCoordinateY) && ((coordinateX === prevToCoordinateX - 1) || (coordinateX === prevToCoordinateX + 1))

        if (wasFromStartingPosition && movedTwoSteps && standingInPosition && board[prevToCoordinateY][prevToCoordinateX]?.type === PieceType.PAWN) {
            const validMove = (HORIZONTAL_AXIS[prevToCoordinateX]) + (VERTICAL_AXIS.length - oneStepY) + " - En Passant";
            possibleMoves.push(validMove)
        }

    }

    return possibleMoves;
}