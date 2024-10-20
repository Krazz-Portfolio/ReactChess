import { useState } from "react";
import "./App.css";
import ChessBoard from "./components/ChessBoard/ChessBoard";
import SettingsMenu from "./components/Settings/SettingMenu";
import TurnIndicator from "./components/TurnIndicator/TurnIndicator";
import { PieceColor } from "./types/types";

function App() {
  const [showPossibleMoves, setShowPossibleMoves] = useState<boolean>(false);
  const [currentTurn, setCurrentTurn] = useState<
    PieceColor.BLACK | PieceColor.WHITE
  >(PieceColor.WHITE);

  return (
    <div className="app">
      <TurnIndicator currentTurn={currentTurn} />
      <div className="game">
        <ChessBoard
          showPossibleMoves={showPossibleMoves === true}
          setCurrentTurn={setCurrentTurn}
        />
        <SettingsMenu
          onClick={() => setShowPossibleMoves(!showPossibleMoves)}
        />
      </div>
    </div>
  );
}

export default App;
