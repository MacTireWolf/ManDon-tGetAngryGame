import React from "react";
import "../styles/organisms/Cube.css";

const Cube = ({dots}) => {
    return (
        <div className="Cube">
          <div className="dots-container">
            {[...Array(dots)].map((_, index) => (
              <div key={index} className="dot"></div>
            ))}
          </div>
        </div>
      );
}

export default Cube;