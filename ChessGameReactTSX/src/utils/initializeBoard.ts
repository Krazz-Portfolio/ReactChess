import { Board, Piece, PieceColor, PieceType } from "../types/types";

export const initializeBoard = (): Board => {
    

    const emptyRow: Array<Piece | null> = new Array(8).fill(null);

    console.log("INITIALIZE")

    const board: Board = [
        [
            { type: PieceType.ROOK, color: PieceColor.BLACK, position: "a8", hasMoved: false },
            { type: PieceType.KNIGHT, color: PieceColor.BLACK, position: "b8", hasMoved: false },
            { type: PieceType.BISHOP, color: PieceColor.BLACK, position: "c8", hasMoved: false },
            { type: PieceType.QUEEN, color: PieceColor.BLACK, position: "d8", hasMoved: false },
            { type: PieceType.KING, color: PieceColor.BLACK, position: "e8", hasMoved: false },
            { type: PieceType.BISHOP, color: PieceColor.BLACK, position: "f8", hasMoved: false },
            { type: PieceType.KNIGHT, color: PieceColor.BLACK, position: "g8", hasMoved: false },
            { type: PieceType.ROOK, color: PieceColor.BLACK, position: "h8", hasMoved: false },
        ],
        [
            { type: PieceType.PAWN, color: PieceColor.BLACK, position: "a7", hasMoved: false },
            { type: PieceType.PAWN, color: PieceColor.BLACK, position: "b7", hasMoved: false },
            { type: PieceType.PAWN, color: PieceColor.BLACK, position: "c7", hasMoved: false },
            { type: PieceType.PAWN, color: PieceColor.BLACK, position: "d7", hasMoved: false },
            { type: PieceType.PAWN, color: PieceColor.BLACK, position: "e7", hasMoved: false },
            { type: PieceType.PAWN, color: PieceColor.BLACK, position: "f7", hasMoved: false },
            { type: PieceType.PAWN, color: PieceColor.BLACK, position: "g7", hasMoved: false },
            { type: PieceType.PAWN, color: PieceColor.BLACK, position: "h7", hasMoved: false }
        ],
        emptyRow.slice(),
        emptyRow.slice(),
        emptyRow.slice(),
        emptyRow.slice(),
        [
            { type: PieceType.PAWN, color: PieceColor.WHITE, position: "a2", hasMoved: false },
            { type: PieceType.PAWN, color: PieceColor.WHITE, position: "b2", hasMoved: false },
            { type: PieceType.PAWN, color: PieceColor.WHITE, position: "c2", hasMoved: false },
            { type: PieceType.PAWN, color: PieceColor.WHITE, position: "d2", hasMoved: false },
            { type: PieceType.PAWN, color: PieceColor.WHITE, position: "e2", hasMoved: false },
            { type: PieceType.PAWN, color: PieceColor.WHITE, position: "f2", hasMoved: false },
            { type: PieceType.PAWN, color: PieceColor.WHITE, position: "g2", hasMoved: false },
            { type: PieceType.PAWN, color: PieceColor.WHITE, position: "h2", hasMoved: false }
        ],
        [
            { type: PieceType.ROOK, color: PieceColor.WHITE, position: "a1", hasMoved: false },
            { type: PieceType.KNIGHT, color: PieceColor.WHITE, position: "b1", hasMoved: false },
            { type: PieceType.BISHOP, color: PieceColor.WHITE, position: "c1", hasMoved: false },
            { type: PieceType.QUEEN, color: PieceColor.WHITE, position: "d1", hasMoved: false },
            { type: PieceType.KING, color: PieceColor.WHITE, position: "e1", hasMoved: false },
            { type: PieceType.BISHOP, color: PieceColor.WHITE, position: "f1", hasMoved: false },
            { type: PieceType.KNIGHT, color: PieceColor.WHITE, position: "g1", hasMoved: false },
            { type: PieceType.ROOK, color: PieceColor.WHITE, position: "h1", hasMoved: false },
        ],
    ];
    
    return board;
}