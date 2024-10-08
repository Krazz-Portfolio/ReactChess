import { useState } from "react";
import "./App.css";
import ChessBoard from "./components/ChessBoard/ChessBoard";
import SettingsMenu from "./components/Settings/SettingMenu";
import TurnIndicator from "./components/TurnIndicator/TurnIndicator";

function App() {
  const [showPossibleMoves, setShowPossibleMoves] = useState<boolean>(false);

  return (
    <div className="app">
      <div className="game">
        <TurnIndicator color={"White"} />
        <ChessBoard showPossibleMoves={showPossibleMoves === true} />
      </div>
      <SettingsMenu onClick={() => setShowPossibleMoves(!showPossibleMoves)} />
    </div>
  );
}

export default App;
