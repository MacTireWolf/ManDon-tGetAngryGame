import React from "react";
import "../styles/atoms/SquareWithinSquare.css";
import Circle from "./Circle";

const SquareWithinSquare = () => {
  
  return (
    <div className="SquareWithinSquare">
        <Circle style={{ top: "25px", left: "25px" }} />
        <Circle style={{ top: "25px", right: "25px" }} />
        <Circle style={{ bottom: "25px", left: "25px" }} />
        <Circle style={{ bottom: "25px", right: "25px" }} />
    </div>
  );
};

export default SquareWithinSquare;