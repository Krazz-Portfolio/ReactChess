import { RefObject } from "react";
import { Board, GameState, Piece, PieceColor, PieceType } from "../../data/types/types";
import { checkPossibleMoves, validateKingInDanger, validateIfCheckmate } from "../../game/MoveValidator";
import { boardCoordinatesToTileId, draggedPosToBoardCoord, tileIdToBoardCoordinates } from "../boardHelpers";

interface HandleMouseUpProps {
    chessboardRef: RefObject<HTMLDivElement>;
    gameState: GameState;
    setGameState: (value: GameState) => void;
    setHoveredSquare: (value: string) => void;
    draggedPosition: {x: number, y: number} | null;
    setPromotionOverlay: (value: PieceColor) => void;
}

export const handleMouseUp = ({chessboardRef, gameState, setGameState, setHoveredSquare, draggedPosition, setPromotionOverlay} : HandleMouseUpProps) => {
    const chessboard = chessboardRef.current;

    const selectedPiece = gameState.selectedPiece;

    if(chessboard && selectedPiece && draggedPosition) {
        const team = selectedPiece.color;
        const enemyTeam = team === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE;

        const oldBoardCoordinates = tileIdToBoardCoordinates(selectedPiece.position)
        const newBoardCoordinates = draggedPosToBoardCoord(draggedPosition.x, draggedPosition.y, chessboard)
        const newTileId = boardCoordinatesToTileId(newBoardCoordinates.tileX, newBoardCoordinates.tileY);

        const updatedPiece = {
            ...selectedPiece,
            position: newTileId,
        }
        
        let isAmongPossibleMoves = checkPossibleMoves(updatedPiece, gameState.possibleMoves);
        let isEnPassant = false;
        let isCastle = false;
        let isPawnPromotion = false;

        if (
          typeof isAmongPossibleMoves === "object" &&
          isAmongPossibleMoves !== null &&
          "isValid" in isAmongPossibleMoves
        ) {
          isCastle = isAmongPossibleMoves.isCastle;
          isEnPassant = isAmongPossibleMoves.isEnPassant;
          isAmongPossibleMoves = isAmongPossibleMoves.isValid;
        }
        const enemyBaseTile = team === PieceColor.WHITE ? 0 : 7;
        if(newBoardCoordinates.tileY === enemyBaseTile && selectedPiece.type === PieceType.PAWN) {
            isPawnPromotion = true;
        }

        if(isAmongPossibleMoves) {
            const newBoard = gameState.board.map((row) => [...row]);

            if(isCastle) {
                const isOwnKingInCheck = validateKingInDanger(newBoard, team);
                if(isOwnKingInCheck) {
                    setGameState({
                        ...gameState,
                        selectedPiece: null,
                        possibleMoves: [],
                    })
                } else {
                    const boardAfterCastle = handleCastlingMove(newBoard, updatedPiece, oldBoardCoordinates, newBoardCoordinates);
                    if(boardAfterCastle) {
                        setGameState({
                            ...gameState,
                            board: newBoard,
                            selectedPiece: null,
                            previousMove: {from: selectedPiece.position, to: newTileId},
                            possibleMoves: [],
                            currentTurn: enemyTeam,
                        })
                    }
                }
            } else if (isPawnPromotion) {
                newBoard[newBoardCoordinates.tileY][newBoardCoordinates.tileX] = updatedPiece;
                newBoard[oldBoardCoordinates.tileY][oldBoardCoordinates.tileX] = null;

                const isOwnKingInCheck = validateKingInDanger(newBoard, team);
                if(isOwnKingInCheck) {
                    setGameState({
                        ...gameState,
                        selectedPiece: null,
                        possibleMoves: [],
                    });
                } else {
                    setPromotionOverlay(updatedPiece.color);
                    setGameState({
                        ...gameState,
                        board: newBoard,
                        selectedPiece: null,
                        possibleMoves: [],
                        previousMove: {from: selectedPiece.position, to: newTileId}
                    }); 
                } 
            } else {
                newBoard[newBoardCoordinates.tileY][newBoardCoordinates.tileX] = updatedPiece;
                newBoard[oldBoardCoordinates.tileY][oldBoardCoordinates.tileX] = null;
                if(isEnPassant) {
                    newBoard[oldBoardCoordinates.tileY][newBoardCoordinates.tileX] = null;
                }
                const isOwnKingInCheck = validateKingInDanger(newBoard, team);

                if(!isOwnKingInCheck) {
                    const isEnemyKingInCheck = validateKingInDanger(newBoard, enemyTeam);
    
                    if (isEnemyKingInCheck) {
                        const isGameWon = validateIfCheckmate(newBoard, enemyTeam);
                        console.log("isGameWon: ", isGameWon)
                        if(isGameWon) {
                            setGameState({
                                ...gameState,
                                board: newBoard,
                                selectedPiece: null,
                                possibleMoves: [],
                                previousMove: {from: selectedPiece.position, to: newTileId},
                                winner: updatedPiece.color,
                            })
                        } else {
                            setGameState({
                                ...gameState,
                                board: newBoard,
                                selectedPiece: null,
                                possibleMoves: [],
                                previousMove: {from: selectedPiece.position, to: newTileId},
                                currentTurn: enemyTeam,
                            })
                        }
                    } else {
                        setGameState({
                            ...gameState,
                            board: newBoard,
                            selectedPiece: null,
                            previousMove: {from: selectedPiece.position, to: newTileId},
                            possibleMoves: [],
                            currentTurn: enemyTeam,
                        })
                    }
                } else {
                    setGameState({
                        ...gameState,
                        selectedPiece: null,
                        possibleMoves: [],
                    })
                }
            }
        } else {
            setGameState({
                ...gameState,
                selectedPiece: null,
                possibleMoves: [],
            })
        }
    }
    setHoveredSquare("")
  };



const handleCastlingMove = (
    newBoard: Board, 
    updatedPiece: Piece, 
    oldBoardCoordinates: {tileX: number, tileY: number}, 
    newBoardCoordinates: {tileX: number, tileY: number}
) : Board | undefined => {
    const newKingX = newBoardCoordinates.tileX > 4 ? 6 : 2;
    const yPosition = newBoardCoordinates.tileY;
    const newRookX = newKingX === 6 ? 5 : 3;
    const oldRookX = newRookX === 5 ? 7 : 0;

    const newRookTileId = boardCoordinatesToTileId(newRookX, yPosition);
    const newKingTileId = boardCoordinatesToTileId(newKingX, yPosition);
    const updatedKing = {
        ...updatedPiece,
        position: newKingTileId,
        hasMoved: true,
    }

    const rookToBeMoved = newBoard[yPosition][oldRookX];

    if (rookToBeMoved) {
        const updatedRook = {
            ...rookToBeMoved,
            position: newRookTileId,
            hasMoved: true,
        }
        newBoard[yPosition][newRookX] = updatedRook;
        newBoard[yPosition][oldRookX] = null;
        newBoard[yPosition][newKingX] = updatedKing;
        newBoard[yPosition][oldBoardCoordinates.tileX] = null;
        return newBoard;
    }
    return;
}