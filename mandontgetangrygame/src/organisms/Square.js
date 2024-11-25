import React from "react";
import "../styles/organisms/Square.css";
import SquareWithinSquare from "../atoms/SquareWithinSquare";

const Square = ({ colour, style, playerName }) => {
  const isTopPosition = colour === "red" || colour === "blue";

  return (
    <div className={`Square square-${colour}`} style={style}>
      <div className={`player-name ${isTopPosition ? "top" : "bottom"}`}>
        {playerName}
      </div>
      <SquareWithinSquare />
    </div>
  );
};

export default Square;
