import { HORIZONTAL_AXIS, VERTICAL_AXIS } from "../../data/constants/constants";
import { Board, Piece, PieceColor, PieceType, Position } from "../../data/types/types";
import { boardCoordinatesToTileId } from "../../utils/boardHelpers";
import { validateTileInDanger } from "../MoveValidator";
export const getPossibleKingMoves = (piece: Piece, board: Board, oldPosition: Position, isKingInDanger?: boolean) => {

    let possibleMoves: string[] = []

    const enemyTeam = piece.color === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE;

    const coordinateY =  VERTICAL_AXIS.length - parseInt(oldPosition[1]);

    const coordinateX = HORIZONTAL_AXIS.indexOf(String.fromCharCode(oldPosition[0].charCodeAt(0)));

    const moves = [
        [-1, 1], [0, 1], [1, 1],
        [-1, 0],         [1, 0],
        [-1, -1], [0, -1], [1, -1]
    ]

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

    if (!piece.hasMoved && isKingInDanger === false) {
        for(let x = coordinateX + 1; x < 8; x++) {
            const pieceOnSquare = board[coordinateY][x];
            console.log(x)

            if(x === 7) {
                if(pieceOnSquare?.type === PieceType.ROOK && !pieceOnSquare.hasMoved) {
                    possibleMoves.push(HORIZONTAL_AXIS[x - 1] + (VERTICAL_AXIS.length - coordinateY) + " - Castle")
                    possibleMoves.push(HORIZONTAL_AXIS[x] + (VERTICAL_AXIS.length - coordinateY) + " - Castle")
                }
            } else if (pieceOnSquare === null) {
                const tileId = boardCoordinatesToTileId(x, coordinateY);
                const isTileInDanger = validateTileInDanger(board, piece.color, tileId);
                if(isTileInDanger) {
                    break;
                };
            } else if (pieceOnSquare !== null) { 
                break;
            }
        }

        for(let x = coordinateX - 1; x >= 0; x--) {
            const pieceOnSquare = board[coordinateY][x];

            if(x === 0) {
                if(pieceOnSquare?.type === PieceType.ROOK && !pieceOnSquare.hasMoved) {
                    possibleMoves.push(HORIZONTAL_AXIS[x + 2] + (VERTICAL_AXIS.length - coordinateY) + " - Castle")
                    possibleMoves.push(HORIZONTAL_AXIS[x + 1] + (VERTICAL_AXIS.length - coordinateY) + " - Castle")
                    possibleMoves.push(HORIZONTAL_AXIS[x] + (VERTICAL_AXIS.length - coordinateY) + " - Castle")
                }
            } else if (pieceOnSquare === null) {
                const tileId = boardCoordinatesToTileId(x, coordinateY);
                const isTileInDanger = validateTileInDanger(board, piece.color, tileId);
                if(isTileInDanger && x !== 1) {
                    break;
                };
            } else if (pieceOnSquare !== null) {
                break;
            }
        }
    }

    return possibleMoves;
}