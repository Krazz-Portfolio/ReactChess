import "./SettingMenu.css";

interface Props {
  toggleShowMoves: () => void;
  onResignClick: () => void;
  onRestartClick: () => void;
}

const SettingsMenu = ({
  toggleShowMoves,
  onResignClick,
  onRestartClick,
}: Props) => {
  return (
    <div className="setting-menu">
      <h1>Settings</h1>
      <div className="options">
        <h4 onClick={toggleShowMoves}>Display moves</h4>
        <input type="checkbox" onMouseDown={toggleShowMoves}></input>
      </div>
      <div className="game-buttons">
        <div className="restart">
          <h5 onClick={onRestartClick}>Restart</h5>
        </div>
        <div className="resign">
          <h5 onClick={onResignClick}>Resign</h5>
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;
