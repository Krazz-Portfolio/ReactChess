import { Board, Piece, PieceType, Position } from "../types/types";
import { isValidPawnMove } from "./validators/PawnValidator";
import { isValidRookMove } from "./validators/RookValidator"

export const isValidMove = (piece: Piece, oldPosition: Position, board: Board, previousMove: {from: Position; to: Position}) : 
Boolean | undefined | {isValid: boolean; isEnPassant: boolean} => {

    switch(piece.type) {
        case PieceType.PAWN:
            return(isValidPawnMove(piece, oldPosition, board, previousMove));
        case PieceType.ROOK:
            return(isValidRookMove(piece, board, oldPosition))
    }
}