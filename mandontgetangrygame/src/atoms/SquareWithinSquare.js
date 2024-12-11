import React from "react";
import "../styles/atoms/SquareWithinSquare.css";
import Circle from "./Circle";

const SquareWithinSquare = ({ squareColour, pawns, setSelectedPawnId, movedPawns}) => {
  const movedPawnsForColour = movedPawns[squareColour] || [];

  return (
    <div className="SquareWithinSquare">
      {pawns?.map((pawn, index) => (
        !movedPawnsForColour.includes(pawn.id) && (
          <Circle
            key={pawn.id}
            style={{
              position: "absolute",
              top: index < 2 ? "25px" : "auto",
              bottom: index >= 2 ? "25px" : "auto",
              left: index % 2 === 0 ? "25px" : "auto",
              right: index % 2 === 1 ? "25px" : "auto",
            }}
            colour={squareColour}
            id={pawn.id}
            setSelectedPawnId={setSelectedPawnId}
          />
        )
      ))}
    </div>
  );
};

export default SquareWithinSquare;
