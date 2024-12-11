import React from "react";
import "../styles/atoms/BlueVerticalCells.css";
import Pawn from "./Pawn";

const BlueVerticalCells = ({positions, playerColour}) => {
  const cells = [
    { id: 1, className: "normal" },
    { id: 2, className: "normal", content: ">" },
    { id: 3, className: "normal" },
    { id: 4, className: "normal" },
    { id: 5, className: "highlight" },
    { id: 6, className: "highlight" },
    { id: 7, className: "normal" },
    { id: 8, className: "highlight" },
    { id: 9, className: "normal" },
    { id: 10, className: "normal" },
    { id: 11, className: "highlight" },
    { id: 12, className: "normal" },
    { id: 13, className: "normal" },
    { id: 14, className: "highlight" },
    { id: 15, className: "normal" },
    { id: 16, className: "normal" },
    { id: 17, className: "highlight" },
    { id: 18, className: "normal" },
  ];

  return (
    <div className="grid-container-blue">
      {cells.map((cell) => (
        <div key={cell.id} className={`grid-item ${cell.className}`}>
         {positions.includes(cell.id) && (
            <Pawn
              colour={playerColour}
              id={cell.id}
              className="smaller"
            />
          )}
          {cell.content && <span className="blue-arrow">{cell.content}</span>}
        </div>
      ))}
    </div>
  );
};

export default BlueVerticalCells;
