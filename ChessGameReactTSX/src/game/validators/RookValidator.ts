import { HORIZONTAL_AXIS, VERTICAL_AXIS } from "../../Constants";
import { Board, Piece, PieceColor, Position } from "../../types/types";

export const isValidRookMove = (piece: Piece, board: Board, oldPosition: Position) => {

    const team = piece.color;
    const enemyTeam = piece.color === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE;

    const horizontalMovement = (piece.position[0].charCodeAt(0) - oldPosition[0].charCodeAt(0));
    const verticalMovement = parseInt(piece.position[1]) - parseInt(oldPosition[1])

    const movingFromHorizontal = Math.min(piece.position[0].charCodeAt(0), oldPosition[0].charCodeAt(0));
    const movingToHorizontal = Math.max(piece.position[0].charCodeAt(0), oldPosition[0].charCodeAt(0));

    const movingFromVertical = Math.min(parseInt(piece.position[1]), parseInt(oldPosition[1]));
    const movingToVertical = Math.max(parseInt(piece.position[1]), parseInt(oldPosition[1]));

    const newPositionY = VERTICAL_AXIS.length - parseInt(piece.position[1]);
    const newPositionX = HORIZONTAL_AXIS.indexOf(piece.position[0])
    console.log(newPositionX)

    if (horizontalMovement === 0 && verticalMovement !== 0) {
        console.log("vertical")

        for (let y = movingFromVertical + 1; y < movingToVertical; y++) {

            const coordinateY = (VERTICAL_AXIS.length - y);

            // If a piece obstructed during movement, do not allow move.
            if (board[coordinateY][newPositionX] !== null) {
                return false;
            }
        }

    } else if (verticalMovement === 0 && horizontalMovement !== 0) {

        console.log("horizontal")
        for (let x = movingFromHorizontal + 1; x < movingToHorizontal; x++) {

            console.log(HORIZONTAL_AXIS.indexOf(String.fromCharCode(x)))
            console.log(newPositionY)

            const coordinateX = HORIZONTAL_AXIS.indexOf(String.fromCharCode(x));

            if (board[newPositionY][coordinateX] !== null) {
                return false;
            }
        }
    }

    if ((horizontalMovement === 0 && verticalMovement !== 0) || (verticalMovement === 0 && horizontalMovement !== 0)) {
        if ( board[newPositionY][newPositionX] === null ) {
            return true;
        } else if ( board[newPositionY][newPositionX].color === team) {
            return false;
        } else if ( board[newPositionY][newPositionX].color === enemyTeam ) {
            return true;
        } else {
            return false;
        }
    }
}