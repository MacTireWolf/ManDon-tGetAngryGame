import React from "react";
import "../styles/atoms/Pawn.css";

const Pawn = ({ colour }) => {
  return (
    <div className={`Pawn ${colour}`} />
  );
};

export default Pawn;
