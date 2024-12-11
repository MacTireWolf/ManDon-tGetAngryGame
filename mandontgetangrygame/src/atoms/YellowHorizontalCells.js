import React from "react";
import "../styles/atoms/YellowHorizontalCells.css";
import Pawn from "./Pawn";

const YellowHorizontalCells = ({positions, playerColour}) => {
  const cells = [
    { id: 1, className: "normal" },
    { id: 2, className: "normal" },
    { id: 3, className: "normal" },
    { id: 4, className: "normal" },
    { id: 5, className: "normal" },
    { id: 6, className: "normal" },
    { id: 7, className: "highlight" },
    { id: 8, className: "highlight" },
    { id: 9, className: "highlight" },
    { id: 10, className: "highlight" },
    { id: 11, className: "highlight" },
    { id: 12, className: "normal", content: "<" },
    { id: 13, className: "normal" },
    { id: 14, className: "normal" },
    { id: 15, className: "normal" },
    { id: 16, className: "normal" },
    { id: 17, className: "highlight" },
    { id: 18, className: "normal" },
  ];

  return (
    <div className="grid-container-yellow">
      {cells.map((cell) => (
        <div key={cell.id} className={`grid-item ${cell.className}`}>
          {positions.includes(cell.id) && (
            <Pawn
              colour={playerColour}
              id={cell.id}
              className="smaller"
            />
          )}
          {cell.content && <span className="yellow-arrow">{cell.content}</span>}
        </div>
      ))}
    </div>
  );
};

export default YellowHorizontalCells;
