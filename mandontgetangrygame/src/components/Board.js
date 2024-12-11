import React, { useState, useEffect } from "react";
import "../styles/components/Board.css";
import Square from "../organisms/Square";
import Center from "../organisms/Center";
import RedHorizontalCells from "../atoms/RedHorizontalCells";
import YellowHorizontalCells from "../atoms/YellowHorizontalCells";
import BlueVerticalCells from "../atoms/BlueVerticalCells";
import GreenVerticalCells from "../atoms/GreenVerticalCells";

const Board = ({ players, setSelectedPawnId  }) => {
  const [playersNames, setPlayerNames] = useState({
    red: "",
    blue: "",
    green: "",
    yellow: "",
  });

  useEffect(() => {
    const newData = {
      red: players.find(p => p.colour === "red")?.name || "",
      blue: players.find(p => p.colour === "blue")?.name || "",
      green: players.find(p => p.colour === "green")?.name || "",
      yellow: players.find(p => p.colour === "yellow")?.name || "",
    };

    if (JSON.stringify(newData) !== JSON.stringify(playersNames)) {
      setPlayerNames(newData);
    }
  }, [players, playersNames]);

  const getPawnPositions = (colour) => {
    const player = players.find((p) => p.colour === colour);
    return player && player.pawns ? player.pawns.map((pawn) => pawn.position) : [];
  };   

  return (
    <div className="Board">
      <Square colour="red" style={{ top: 0, left: 0 }} playerName={playersNames.red} pawns={players.find(p => p.colour === "red")?.pawns} setSelectedPawnId={setSelectedPawnId} />
      <Square colour="blue" style={{ top: 0, right: 0 }} playerName={playersNames.blue} pawns={players.find(p => p.colour === "blue")?.pawns} setSelectedPawnId={setSelectedPawnId} />
      <Square colour="green" style={{ bottom: 0, left: 0 }} playerName={playersNames.green} pawns={players.find(p => p.colour === "green")?.pawns} setSelectedPawnId={setSelectedPawnId} />
      <Square colour="yellow" style={{ bottom: 0, right: 0 }} playerName={playersNames.yellow} pawns={players.find(p => p.colour === "yellow")?.pawns} setSelectedPawnId={setSelectedPawnId} />
      <Center />
      <div className="horizontal-cells-container">
        <RedHorizontalCells positions={getPawnPositions("red")}/>
        <YellowHorizontalCells positions={getPawnPositions("yellow")}/>
      </div>
      <div className="vertical-cells-container">
        <BlueVerticalCells positions={getPawnPositions("blue")}/>
        <GreenVerticalCells positions={getPawnPositions("green")}/>
      </div>
    </div>
  );
};

export default Board;
