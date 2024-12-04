import React from "react";
import "../styles/atoms/Circle.css";
import Pawn from "./Pawn";

const Circle = ({style, colour}) => {
  
  return (
    <div className="Circle" style={style}>
      <Pawn colour={colour}/>
    </div>
  );
};

export default Circle;