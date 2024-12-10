import React from "react";
import "../styles/atoms/Circle.css";
import Pawn from "./Pawn";

const Circle = ({ style, colour, id, setSelectedPawnId }) => {
  const handlePawnSelect = () => {
    if (setSelectedPawnId) {
      console.log(`Selected Pawn ID: ${id}`);
      setSelectedPawnId(id);
    }
  };

  return (
    <div className="Circle" style={style}>
      <Pawn colour={colour} id={id} onSelect={handlePawnSelect} />
    </div>
  );
};

export default Circle;
