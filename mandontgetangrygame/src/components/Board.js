import React from "react";
import "../styles/components/Board.css";
import Square from "../organisms/Square";
import Center from "../organisms/Center";

const Board = () => {
  
  return (
    <div className="Board">
      <Square colour="red" style={{ top: 0, left: 0 }} />
      <Square colour="blue" style={{ top: 0, right: 0 }} />
      <Square colour="green" style={{ bottom: 0, left: 0 }} />
      <Square colour="yellow" style={{ bottom: 0, right: 0 }} />
      <Center/>
    </div>
  );
};

export default Board;
