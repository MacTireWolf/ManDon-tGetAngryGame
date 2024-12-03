import React from "react";
import "../styles/organisms/ExitGameButton.css";

const ExitGameButton = ({onExitGame, colour}) => {
  return (
    <div className="ExitGameButton">
        <button onClick={ () => onExitGame(colour)}>Opuść grę</button>
    </div>
  );
};

export default ExitGameButton;