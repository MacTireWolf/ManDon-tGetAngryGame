import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../styles/components/Board.css";
import Square from "../organisms/Square";
import Center from "../organisms/Center";
import RedHorizontalCells from "../atoms/RedHorizontalCells";
import YellowHorizontalCells from "../atoms/YellowHorizontalCells";
import BlueVerticalCells from "../atoms/BlueVerticalCells";
import GreenVerticalCells from "../atoms/GreenVerticalCells";
import { backendPlayersNamesAdress } from "../Consts.js";

const Board = () => {

  const[playersNames, setPlayerNames] = useState({
    red: "",
    blue: "",
    green: "",
    yellow: "",
  })
  const getData = () => {
    axios.get(backendPlayersNamesAdress + "/getPlayers").then((response) => {
      console.log(response.data);
      setPlayerNames(response.data);
    }).catch((error) => console.error(error));
  }
  const addPlayers = () => {
    axios.post(backendPlayersNamesAdress + "/setNames").then((response) => {
      console.log(response.data);
      getData();
    }).catch((error) => console.error(error));
  }

  useEffect(() => {
    getData();
  },[]);
  
  return (
    <div className="Board">
      <Square colour="red" style={{ top: 0, left: 0 }} playerName={playersNames.red}/>
      <Square colour="blue" style={{ top: 0, right: 0 }} playerName={playersNames.blue}/>
      <Square colour="green" style={{ bottom: 0, left: 0 }} playerName={playersNames.green}/>
      <Square colour="yellow" style={{ bottom: 0, right: 0 }} playerName={playersNames.yellow} />
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
};

export default Board;
