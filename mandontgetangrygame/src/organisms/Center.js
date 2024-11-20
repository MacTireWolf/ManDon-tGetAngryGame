import React from "react";
import "../styles/organisms/Center.css";
import Triangle from "../atoms/Triangle";

const Center = () => {
  
  return (
    <div className="Center">
      <Triangle color="blue" style={{ top: 0, left: 0 }} />
    </div>
  );  
};

export default Center;