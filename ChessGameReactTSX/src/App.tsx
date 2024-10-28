import { useState } from "react";
import "./App.css";
import ChessBoard from "./components/ChessBoard/ChessBoard";
import { GameState, PieceColor } from "./data/types/types";
import { initializeBoard } from "./utils/initializeBoard";
import TurnIndicator from "./components/TurnIndicator/TurnIndicator";
import SettingsMenu from "./components/Settings/SettingMenu";
import { handleResign } from "./utils/gameFeatureHandlers/handleResign";
import { handleRestart } from "./utils/gameFeatureHandlers/handleRestart";

function App() {
  const [gameState, setGameState] = useState<GameState>(() => ({
    board: initializeBoard(),
    currentTurn: PieceColor.WHITE,
    selectedPiece: null,
    possibleMoves: [],
    previousMove: { from: "", to: "" },
    winner: null,
  }));

  const [showPossibleMoves, setShowPossibleMoves] = useState<boolean>(false);

  return (
    <div className="app">
      <TurnIndicator currentTurn={gameState.currentTurn} />
      <div className="game">
        <ChessBoard
          showPossibleMoves={showPossibleMoves === true}
          gameState={gameState}
          setGameState={setGameState}
        />
        <SettingsMenu
          toggleShowMoves={() => setShowPossibleMoves(!showPossibleMoves)}
          onResignClick={() => handleResign({ gameState, setGameState })}
          onRestartClick={() => handleRestart({ setGameState })}
        />
      </div>
    </div>
  );
}

export default App;
