import React from "react";
import "../styles/atoms/Triangle.css";

const Triangle = ({colour, style}) => {
  
  return (
    <div className={`Triangle triangle-${colour}`} style={style}></div>
  );
};

export default Triangle;