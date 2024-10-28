
import { RefObject } from "react";
import { GameState } from "../../data/types/types";
import { HORIZONTAL_AXIS, VERTICAL_AXIS } from "../../data/constants/Constants";

interface HandleMouseMoveProps {
    event: React.MouseEvent;
    chessboardRef: RefObject<HTMLDivElement>;
    gameState: GameState;
    setGameState: (value: GameState) => void;
    setHoveredSquare: (value: string) => void;
    setDraggedPosition: (value: {x: number, y: number}) => void;
}

export function handleMouseMove({event, chessboardRef, gameState, setGameState, setHoveredSquare, setDraggedPosition} : HandleMouseMoveProps){
    if (gameState.selectedPiece && chessboardRef.current) {
        const chessboard = chessboardRef.current;

        const boardStartHorizontal = chessboard.offsetLeft;
        const boardStartVertical = chessboard.offsetTop;
        const boardEndHorizontal = chessboard.clientWidth + boardStartHorizontal;
        const boardEndVertical = chessboard.clientHeight + boardStartVertical;

        if (
        event.clientX > boardEndHorizontal - 20 ||
        event.clientX < boardStartHorizontal + 20 ||
        event.clientY > boardEndVertical - 20 ||
        event.clientY < boardStartVertical + 28
        ) {
        setHoveredSquare("");
        setGameState({
            ...gameState,
            selectedPiece: null,
            possibleMoves: [],
        });
        return;
        }

        // This is functionality to show that you are hovering over a square.
        const hoveredX = Math.floor(
        (event.clientX - boardStartHorizontal) / (chessboard.clientWidth / 8)
        );
        const hoveredY = Math.floor(
        (event.clientY - boardStartVertical) / (chessboard.clientHeight / 8)
        );

        const xAxis = HORIZONTAL_AXIS[hoveredX];
        const yAxis = VERTICAL_AXIS[VERTICAL_AXIS.length - hoveredY - 1];
        setHoveredSquare(xAxis.toString() + yAxis.toString());
        // --------------

        setDraggedPosition({
        x: event.clientX - boardStartHorizontal,
        y: event.clientY - boardStartVertical,
        });
    }   
}