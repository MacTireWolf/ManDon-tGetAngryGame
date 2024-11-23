import React from "react";
import "../styles/organisms/Center.css";
import Triangle from "../atoms/Triangle";

const Center = () => {
  
  return (
    <div className="Center">
      <Triangle colour="red" style={{ bottom: 0, right: 0 }} />
      <Triangle colour="blue" style={{ top: 0, right: 0 }} />
      <Triangle colour="green" style={{ bottom: 0, left: 0 }} />
      <Triangle colour="yellow" style={{ top: 0, left: 0 }} />
    </div>
  );  
};

export default Center;