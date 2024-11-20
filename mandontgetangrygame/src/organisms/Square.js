import React from "react";
import "../styles/organisms/Square.css";
import SquareWithinSquare from "../atoms/SquareWithinSquare";

const Square = ({colour, style}) => {
  
  return (
    <div className={`Square square-${colour}`} style={style}>
      <SquareWithinSquare/>
    </div>
    
  );
};

export default Square;