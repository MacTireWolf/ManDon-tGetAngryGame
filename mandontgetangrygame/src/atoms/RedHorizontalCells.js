import React from "react";
import "../styles/atoms/RedHorizontalCells.css";
import Pawn from "./Pawn";

const RedHorizontalCells = ({ positions, playerColour, pawns = [], setSelectedPawnId }) => {
  const cells = [
    { id: 1, className: "normal" },
    { id: 2, className: "highlight" },
    { id: 3, className: "normal" },
    { id: 4, className: "normal" },
    { id: 5, className: "normal" },
    { id: 6, className: "normal" },
    { id: 7, className: "normal", content: ">" },
    { id: 8, className: "highlight" },
    { id: 9, className: "highlight" },
    { id: 10, className: "highlight" },
    { id: 11, className: "highlight" },
    { id: 12, className: "highlight" },
    { id: 13, className: "normal" },
    { id: 14, className: "normal" },
    { id: 15, className: "normal" },
    { id: 16, className: "normal" },
    { id: 17, className: "normal" },
    { id: 18, className: "normal" },
  ];

  return (
    <div className="grid-container-red">
      {cells.map((cell) => (
        <div key={cell.id} className={`grid-item ${cell.className}`}>
          {pawns.map((pawn) => (
            positions.includes(cell.id) && pawn.position === cell.id ? (
              <Pawn
                key={pawn.id}
                colour={playerColour}
                id={pawn.id}
                onSelect={() => setSelectedPawnId(pawn.id)}
                className={`smaller ${playerColour}`}
              />  
            ) : null
          ))}
          {cell.content && <span className="red-arrow">{cell.content}</span>}
        </div>
      ))}
    </div>
  );
};

export default RedHorizontalCells;
