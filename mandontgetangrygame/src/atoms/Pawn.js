import React from "react";
import "../styles/atoms/Pawn.css";

const Pawn = ({ colour, id, onSelect, className }) => {
  const handleClick = () => {
    if (onSelect) {
      console.log(`Pawn clicked with ID: ${id}`);
      onSelect(id);
    }
  };

  return (
    <div className={`Pawn ${colour} ${className || ""}`} onClick={handleClick} />
  );
};

export default Pawn;
