import React from "react";
import "../styles/atoms/Pawn.css";

const Pawn = ({ colour, id, onSelect }) => {
  const handleClick = () => {
    if (onSelect) {
      console.log(`Pawn clicked with ID: ${id}`);
      onSelect(id);
    }
  };

  return (
    <div className={`Pawn ${colour}`} onClick={handleClick} />
  );
};

export default Pawn;
