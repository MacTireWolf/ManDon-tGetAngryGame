import React, { useState, useEffect } from "react";
import "../styles/components/Board.css";
import Square from "../organisms/Square";
import Center from "../organisms/Center";
import RedHorizontalCells from "../atoms/RedHorizontalCells";
import YellowHorizontalCells from "../atoms/YellowHorizontalCells";
import BlueVerticalCells from "../atoms/BlueVerticalCells";
import GreenVerticalCells from "../atoms/GreenVerticalCells";

const Board = ({ players, setSelectedPawnId, movedPawns, handlePawnMove  }) => {
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
      <Square colour="red" style={{ top: 0, left: 0 }} playerName={playersNames.red} pawns={players.find(p => p.colour === "red")?.pawns} setSelectedPawnId={setSelectedPawnId} movedPawns={movedPawns} handlePawnMove={handlePawnMove} />
      <Square colour="blue" style={{ top: 0, right: 0 }} playerName={playersNames.blue} pawns={players.find(p => p.colour === "blue")?.pawns} setSelectedPawnId={setSelectedPawnId} movedPawns={movedPawns} handlePawnMove={handlePawnMove} />
      <Square colour="green" style={{ bottom: 0, left: 0 }} playerName={playersNames.green} pawns={players.find(p => p.colour === "green")?.pawns} setSelectedPawnId={setSelectedPawnId} movedPawns={movedPawns} handlePawnMove={handlePawnMove} />
      <Square colour="yellow" style={{ bottom: 0, right: 0 }} playerName={playersNames.yellow} pawns={players.find(p => p.colour === "yellow")?.pawns} setSelectedPawnId={setSelectedPawnId} movedPawns={movedPawns} handlePawnMove={handlePawnMove} />
      <Center />
      <div className="horizontal-cells-container">
        <RedHorizontalCells playerColour="red" positions={getPawnPositions("red")} setSelectedPawnId={setSelectedPawnId} pawns={players.find(p => p.colour === "red")?.pawns} />
        <YellowHorizontalCells playerColour="yellow" positions={getPawnPositions("yellow")} setSelectedPawnId={setSelectedPawnId} pawns={players.find(p => p.colour === "yellow")?.pawns} />
      </div>
      <div className="vertical-cells-container">
        <BlueVerticalCells playerColour="blue" positions={getPawnPositions("blue")} setSelectedPawnId={setSelectedPawnId} pawns={players.find(p => p.colour === "blue")?.pawns} />
        <GreenVerticalCells playerColour="green" positions={getPawnPositions("green")} setSelectedPawnId={setSelectedPawnId} pawns={players.find(p => p.colour === "green")?.pawns} />
      </div>
    </div>
  );
};

export default Board;
