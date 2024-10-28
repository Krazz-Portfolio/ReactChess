import { GameState, PieceColor } from "../../data/types/types"
import { initializeBoard } from "../initializeBoard";

interface RestartProps {
    setGameState: (value: GameState) => void;
}

export const handleRestart = ({setGameState} : RestartProps) => {
    setGameState({
        board: initializeBoard(),
        currentTurn: PieceColor.WHITE,
        selectedPiece: null,
        possibleMoves: [],
        previousMove: { from: "", to: "" },
        winner: null,
    })
}