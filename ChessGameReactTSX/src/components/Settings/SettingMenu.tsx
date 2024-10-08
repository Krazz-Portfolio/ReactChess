import "./SettingMenu.css";

interface Props {
  onClick: () => void;
}

const SettingsMenu = ({ onClick }: Props) => {
  return (
    <div className="setting-menu">
      <h1>Settings</h1>
      <div className="options">
        <h4 onClick={onClick}>Display moves</h4>
        <input type="checkbox" onMouseDown={onClick}></input>
      </div>
    </div>
  );
};

export default SettingsMenu;
