import { Board, Piece, PieceColor, PieceType } from "../types/types";

export const initializeBoard = (): Board => {
    

    const emptyRow: Array<Piece | null> = new Array(8).fill(null);

    const board: Board = [
        [
            { type: PieceType.ROOK, color: PieceColor.WHITE, position: "a8" },
            { type: PieceType.KNIGHT, color: PieceColor.WHITE, position: "b8" },
            { type: PieceType.BISHOP, color: PieceColor.WHITE, position: "c8" },
            { type: PieceType.QUEEN, color: PieceColor.WHITE, position: "d8" },
            { type: PieceType.KING, color: PieceColor.WHITE, position: "e8" },
            { type: PieceType.BISHOP, color: PieceColor.WHITE, position: "f8" },
            { type: PieceType.KNIGHT, color: PieceColor.WHITE, position: "g8" },
            { type: PieceType.ROOK, color: PieceColor.WHITE, position: "h8" },
        ],
        [
            { type: PieceType.PAWN, color: PieceColor.WHITE, position: "a7" },
            { type: PieceType.PAWN, color: PieceColor.WHITE, position: "b7" },
            { type: PieceType.PAWN, color: PieceColor.WHITE, position: "c7" },
            { type: PieceType.PAWN, color: PieceColor.WHITE, position: "d7" },
            { type: PieceType.PAWN, color: PieceColor.WHITE, position: "e7" },
            { type: PieceType.PAWN, color: PieceColor.WHITE, position: "f7" },
            { type: PieceType.PAWN, color: PieceColor.WHITE, position: "g7" },
            { type: PieceType.PAWN, color: PieceColor.WHITE, position: "h7" }
        ],
        emptyRow.slice(),
        emptyRow.slice(),
        emptyRow.slice(),
        emptyRow.slice(),
        [
            { type: PieceType.PAWN, color: PieceColor.BLACK, position: "a2" },
            { type: PieceType.PAWN, color: PieceColor.BLACK, position: "b2" },
            { type: PieceType.PAWN, color: PieceColor.BLACK, position: "c2" },
            { type: PieceType.PAWN, color: PieceColor.BLACK, position: "d2" },
            { type: PieceType.PAWN, color: PieceColor.BLACK, position: "e2" },
            { type: PieceType.PAWN, color: PieceColor.BLACK, position: "f2" },
            { type: PieceType.PAWN, color: PieceColor.BLACK, position: "g2" },
            { type: PieceType.PAWN, color: PieceColor.BLACK, position: "h2" }
        ],
        [
            { type: PieceType.ROOK, color: PieceColor.BLACK, position: "a1" },
            { type: PieceType.KNIGHT, color: PieceColor.BLACK, position: "b1" },
            { type: PieceType.BISHOP, color: PieceColor.BLACK, position: "c1" },
            { type: PieceType.QUEEN, color: PieceColor.BLACK, position: "d1" },
            { type: PieceType.KING, color: PieceColor.BLACK, position: "e1" },
            { type: PieceType.BISHOP, color: PieceColor.BLACK, position: "f1" },
            { type: PieceType.KNIGHT, color: PieceColor.BLACK, position: "g1" },
            { type: PieceType.ROOK, color: PieceColor.BLACK, position: "h1" },
        ],
        
    ]
    return board;
}