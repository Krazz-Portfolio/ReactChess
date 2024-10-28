import { GameState, PieceColor } from "../../data/types/types"

interface ResignProps {
    gameState: GameState;
    setGameState: (value: GameState) => void;
}

export const handleResign = ({gameState, setGameState} : ResignProps) => {
    const enemyTeam = gameState.currentTurn === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE;

    setGameState({
        ...gameState,
        winner: enemyTeam,
    })
}