import { useState } from "react";
import "./App.css";
import ChessBoard from "./components/ChessBoard/ChessBoard";
import SettingsMenu from "./components/Settings/SettingMenu";

function App() {
  const [showPossibleMoves, setShowPossibleMoves] = useState<boolean>(false);

  return (
    <div className="app">
      <ChessBoard showPossibleMoves={showPossibleMoves === true} />
      <SettingsMenu
        onShow={(show: boolean) => setShowPossibleMoves(show)}
        isActive={showPossibleMoves === true}
      />
    </div>
  );
}

export default App;
