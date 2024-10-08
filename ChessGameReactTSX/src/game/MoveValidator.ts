import { Board, Piece, PieceType, Position } from "../types/types";
import { getPossiblePawnMoves } from "./validators/PawnValidator";
import { getPossibleRookMoves } from "./validators/RookValidator";
import { getPossibleKingMoves } from "./validators/KingValidator";
import { getPossibleKnightMoves } from "./validators/KnightValidator";
import { getPossibleBishopMoves } from "./validators/BishopValidator";


export const isValidMove = (piece: Piece, oldPosition: Position, board: Board, previousMove: {from: Position; to: Position}, possibleMoves: Position[]) : 
Boolean | undefined | {isValid: boolean; isEnPassant: boolean, isCastle: boolean} => {

    switch(piece.type) {
        case PieceType.PAWN:
            return(validateMove(piece, possibleMoves));
        case PieceType.ROOK:
            return(validateMove(piece, possibleMoves));
        case PieceType.BISHOP:
            return(validateMove(piece, possibleMoves));
        case PieceType.KNIGHT:
            return(validateMove(piece, possibleMoves));
        case PieceType.KING:
            return(validateMove(piece, possibleMoves));
        case PieceType.QUEEN:
            return(validateMove(piece, possibleMoves));
    }
}

export const getPossibleMoves = (piece: Piece, oldPosition: Position, board: Board, previousMove: {from: Position; to: Position}) : string[] => {

    switch(piece.type) {
        case PieceType.PAWN:
            // return(isValidPawnMove(piece, oldPosition, board, previousMove));
            return(getPossiblePawnMoves(piece.color, board, oldPosition, previousMove));
        case PieceType.ROOK:
            return(getPossibleRookMoves(piece.color, board, oldPosition));
        case PieceType.BISHOP:
            return(getPossibleBishopMoves(piece.color, board, oldPosition));
        case PieceType.KNIGHT:
            return getPossibleKnightMoves(piece.color, board, oldPosition);
        case PieceType.KING:
            return(getPossibleKingMoves(piece, board, oldPosition));
        case PieceType.QUEEN:
            const diagonal = getPossibleBishopMoves(piece.color, board, oldPosition);
            const straight = getPossibleRookMoves(piece.color, board, oldPosition);
            return(diagonal.concat(straight));
    }
}

const validateMove = (piece: Piece, possibleMoves: Position[]) => {

    const isValidMove = possibleMoves.find(move => {
        if (typeof move === 'string' && move.includes(' - En Passant')) {
            const enPassantMove = move.split(' ')[0];
            return enPassantMove === piece.position;
        }

        if (typeof move === 'string' && move.includes(' - Castle')) {
            console.log("its a castling move")
            const castleMove = move.split(' ')[0];
            return castleMove === piece.position;
        }
        return move === piece.position;
    });
    
    if(isValidMove) {

        if (isValidMove.includes(' - En Passant')) {
            return { isValid: true, isEnPassant: true, isCastle: false };
        }
        else if (isValidMove.includes(' - Castle')) {
            return { isValid: true, isEnPassant: false, isCastle: true };
        }
        else {
            return true;
        }
    } else {
        return false;
    }
    
}