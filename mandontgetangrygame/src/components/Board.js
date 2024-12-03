import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import axios from 'axios';
import "../styles/components/Board.css";
import Square from "../organisms/Square";
import Center from "../organisms/Center";
import RedHorizontalCells from "../atoms/RedHorizontalCells";
import YellowHorizontalCells from "../atoms/YellowHorizontalCells";
import BlueVerticalCells from "../atoms/BlueVerticalCells";
import GreenVerticalCells from "../atoms/GreenVerticalCells";
import { backendPlayersNamesAdress } from "../Consts.js";

const Board = forwardRef((_, ref) => {
  const[playersNames, setPlayerNames] = useState({
    red: "",
    blue: "",
    green: "",
    yellow: "",
  })
  const getData = () => {
    axios.get(backendPlayersNamesAdress + "/getPlayers").then((response) => {
      console.log(response.data);
      setPlayerNames({
        red: response.data.red ? response.data.red.name : "",
        blue: response.data.blue ? response.data.blue.name : "",
        green: response.data.green ? response.data.green.name : "",
        yellow: response.data.yellow ? response.data.yellow.name : "",
      });
    }).catch((error) => console.error(error));
  }

  useEffect(() => {
    getData();
  },[]);
  useImperativeHandle(ref, () => ({
    getData,
  }));
  
  return (
    <div className="Board">
      <Square colour="red" style={{ top: 0, left: 0 }} playerName={playersNames.red}/>
      <Square colour="blue" style={{ top: 0, right: 0 }} playerName={playersNames.blue}/>
      <Square colour="green" style={{ bottom: 0, left: 0 }} playerName={playersNames.green}/>
      <Square colour="yellow" style={{ bottom: 0, right: 0 }} playerName={playersNames.yellow}/>
      <Center/>
      <div className="horizontal-cells-container">
        <RedHorizontalCells />
        <YellowHorizontalCells />
      </div>
      <div className="vertical-cells-container">
        <BlueVerticalCells />
        <GreenVerticalCells />
      </div>
    </div>
  );
});

export default Board;
