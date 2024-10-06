import { EventHandler, useState } from "react";
import "./SettingMenu.css";

interface Props {
  onShow: (show: boolean) => void;
  isActive: boolean;
}

const SettingsMenu = ({ onShow, isActive }: Props) => {
  const handleMouseDown = () => {
    onShow(!isActive);
  };

  return (
    <div className="setting-menu">
      <h1>Settings</h1>
      <div className="options">
        <h4>Display moves</h4>
        <input type="checkbox" onMouseDown={handleMouseDown}></input>
      </div>
    </div>
  );
};

export default SettingsMenu;
