import React from "react";
import "../styles/atoms/SquareWithinSquare.css";
import Circle from "./Circle";

const SquareWithinSquare = ({ squareColour }) => {
  return (
    <div className="SquareWithinSquare">
      <Circle style={{ top: "25px", left: "25px" }} colour={squareColour} />
      <Circle style={{ top: "25px", right: "25px" }} colour={squareColour} />
      <Circle style={{ bottom: "25px", left: "25px" }} colour={squareColour} />
      <Circle style={{ bottom: "25px", right: "25px" }} colour={squareColour} />
    </div>
  );
};

export default SquareWithinSquare;
