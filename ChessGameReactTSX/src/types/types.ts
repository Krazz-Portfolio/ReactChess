export enum PieceType {
    PAWN = 'pawn',
    ROOK = 'rook',
    KNIGHT = 'knight',
    BISHOP = 'bishop',
    QUEEN = 'queen',
    KING = 'king'
}

export enum PieceColor {
    WHITE = 'white',
    BLACK = 'black'
}

export type Position = string;

export interface Piece {
    type: PieceType,
    color: PieceColor,
    position: Position
}

export type Board = Array<Array<Piece | null>>;

export interface GameState {
    board: Board,
    currentTurn: PieceColor,
    selectedPiece: Piece,
    possibleMoves: Position[]
    previousMove: {from: Position; to: Position}
}
