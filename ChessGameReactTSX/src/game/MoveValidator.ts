import { Board, Piece, PieceColor, PieceType, Position } from "../data/types/types";
import { tileIdToBoardCoordinates } from "../utils/boardHelpers";
import { getPossibleBishopMoves } from "./validators/BishopValidator";
import { getPossibleKingMoves } from "./validators/KingValidator";
import { getPossibleKnightMoves } from "./validators/KnightValidator";
import { getPossiblePawnMoves } from "./validators/PawnValidator";
import { getPossibleRookMoves } from "./validators/RookValidator";

export const checkPossibleMoves = (piece: Piece, possibleMoves: Position[]) : 
Boolean | undefined | {isValid: boolean; isEnPassant: boolean, isCastle: boolean} => {

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

export const getPossibleMoves = (piece: Piece, oldPosition: Position, board: Board, previousMove: {from: Position; to: Position}, isKingInDanger?: boolean) : string[] => {

    // console.log("HAj", isKingInDanger)
    switch(piece.type) {
        case PieceType.PAWN:
            let moves = getPossiblePawnMoves(piece.color, board, oldPosition, previousMove)
            return moves;
        case PieceType.ROOK:
            return(getPossibleRookMoves(piece.color, board, oldPosition));
        case PieceType.BISHOP:
            return(getPossibleBishopMoves(piece.color, board, oldPosition));
        case PieceType.KNIGHT:
            return getPossibleKnightMoves(piece.color, board, oldPosition);
        case PieceType.KING:
            return(getPossibleKingMoves(piece, board, oldPosition, isKingInDanger));
        case PieceType.QUEEN:
            const diagonal = getPossibleBishopMoves(piece.color, board, oldPosition);
            const straight = getPossibleRookMoves(piece.color, board, oldPosition);
            return(diagonal.concat(straight));
    }
}


export const validateKingInDanger = (board: Board, team: PieceColor) => {

    const enemyTeam = team === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE;

    for(let row = 0; row < board.length; row++) {
        for(let column = 0; column < board.length; column++) {
            const piece = board[row][column];
            if (piece?.color === enemyTeam) {
                let possibleMoves = getPossibleMoves(piece, piece.position, board, {from: "", to: ""});
                for(const move of possibleMoves) {
                    const boardCoordinates = tileIdToBoardCoordinates(move);
                    if(board[boardCoordinates.tileY][boardCoordinates.tileX]?.type === PieceType.KING &&
                        board[boardCoordinates.tileY][boardCoordinates.tileX]?.color === team
                    ) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}


export const validateIfCheckmate = (board: Board, team: PieceColor) => {

    for(let row = 0; row < board.length; row++) {
        for(let column = 0; column < board.length; column++) {
            const piece = board[row][column];
            if (piece?.color === team) {
                let possibleMoves = getPossibleMoves(piece, piece.position, board, {from: "", to: ""})
                const oldPosition = piece.position;
                const oldBoardCoordinates = tileIdToBoardCoordinates(oldPosition);
                
                for(const move of possibleMoves){
                    const simulatedBoard = board.map((row) => [...row]);
                    const boardCoordinates = tileIdToBoardCoordinates(move);
                    const updatedPiece = ({
                        ...piece,
                        position: move,
                    })
                    simulatedBoard[boardCoordinates.tileY][boardCoordinates.tileX] = updatedPiece;
                    simulatedBoard[oldBoardCoordinates.tileY][oldBoardCoordinates.tileX] = null;

                    const kingInDanger = validateKingInDanger(simulatedBoard, team);
                    if (!kingInDanger) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

export const validateTileInDanger = (board: Board, team: PieceColor, tileId: Position) => {

    const enemyTeam = team === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE;

    for(let row = 0; row < board.length; row++) {
        for(let column = 0; column < board.length; column++) {
            const piece = board[row][column];
            if (piece?.color === enemyTeam) {
                let possibleMoves = getPossibleMoves(piece, piece.position, board, {from: "", to: ""});
                for(const move of possibleMoves) {
                    if(move === tileId) {
                        return true;
                    }
                    
                }
            }
        }
    }
    return false;
}