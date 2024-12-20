import React from "react";
import "../styles/organisms/Square.css";
import SquareWithinSquare from "../atoms/SquareWithinSquare";

const Square = ({ colour, style, playerName, pawns, setSelectedPawnId, movedPawns, handlePawnMove}) => {
  const isTopPosition = colour === "red" || colour === "blue";

  return (
    <div className={`Square square-${colour}`} style={style}>
      <div className={`player-name ${isTopPosition ? "top" : "bottom"}`}>
        {playerName}
      </div>
      <SquareWithinSquare squareColour={colour} pawns={pawns} setSelectedPawnId={setSelectedPawnId} movedPawns={movedPawns} handlePawnMove={handlePawnMove} />
    </div>
  );
};

export default Square;
