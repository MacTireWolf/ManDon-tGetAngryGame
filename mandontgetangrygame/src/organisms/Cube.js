import React from "react";
import "../styles/organisms/Cube.css";

const Cube = ({dots, onClick, position}) => {
  return (
    <div
      className="Cube"
      onClick={onClick}
      style={{
        position: "absolute",
        ...position,
      }}
    >
      <div className="dots-container">
        {[...Array(dots)].map((_, index) => (
          <div key={index} className="dot"></div>
        ))}
      </div>
    </div>
  );
}

export default Cube;