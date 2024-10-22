import { HORIZONTAL_AXIS, VERTICAL_AXIS } from "../../Constants";
import { Board, Piece, PieceColor, PieceType, Position } from "../../types/types";

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

    if(oneStepY < 8 && oneStepY >= 0) {
        if (oneStepLeft >= 0 && board[oneStepY][oneStepLeft] !== null && board[oneStepY][oneStepLeft].color === enemyTeam) {
            const validMove = (HORIZONTAL_AXIS[oneStepLeft]) + (VERTICAL_AXIS.length - oneStepY);
            possibleMoves.push(validMove)
        }
    
        if (oneStepRight < 8 && board[oneStepY][oneStepRight] !== null && board[oneStepY][oneStepRight].color === enemyTeam) {
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