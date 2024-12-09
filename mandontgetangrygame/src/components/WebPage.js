import React, { useState } from "react";
import { Helmet } from "react-helmet";
import "../styles/components/WebPage.css";
import "../styles/Consts.css";
import Chat from "../organisms/Chat";
import Board from "./Board";
import ExitGameButton from "../organisms/ExitGameButton";
import Cube from "../organisms/Cube";
import PlayerInputModal from "./PlayerInputModal";
import axios from "axios";
import { backendPlayersNamesAdress } from "../Consts";

const WebPage = () => {
  const title = "Chińczyk";
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [playerColour, setPlayerColour] = useState(null);
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [dots, setDots] = useState(6);
  const [isRolling, setIsRolling] = useState(false);

  const handleCloseModal = (newPlayers) => {
    setIsModalOpen(false);
    setPlayers((prevPlayers) => [...prevPlayers, ...newPlayers]);
    if (newPlayers.length > 0) setPlayerColour(newPlayers[0].colour);
  };

  const refreshPlayers = () => {
    axios
      .get(backendPlayersNamesAdress + "/getPlayers")
      .then((response) => {
        setPlayers(Object.values(response.data));
      })
      .catch((error) => console.error("Error fetching players:", error));
  };

  const deletePlayer = (colour) => {
    axios
      .delete(backendPlayersNamesAdress + `/deletePlayer/${colour}`)
      .then((response) => {
        console.log(response.data);
        refreshPlayers();
        window.close();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCubeClick = () => {
    const randomDots = Math.floor(Math.random() * 6) + 1;
    setDots(randomDots);
    setIsRolling(true);
    sendMoveRequest(randomDots);
  };

  const sendMoveRequest = (dots) => {
    const currentPlayer = players[currentPlayerIndex];

    if (!currentPlayer) return;

    axios
      .post(backendPlayersNamesAdress + `/movePawn`, {
        colour: currentPlayer.colour,
        pawnId: 1,
        steps: dots,
      })
      .then((response) => {
        console.log("Pawn moved:", response.data);
        refreshPlayers();
        setIsRolling(false);
        nextPlayer();
      })
      .catch((error) => {
        console.error("Error moving pawn:", error);
        setIsRolling(false);
      });
  };

  const nextPlayer = () => {
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
  };

  const getCubePosition = (colour) => {
    switch (colour) {
      case "blue":
        return { top: "4%", right: "20%" };
      case "yellow":
        return { bottom: "15%", right: "20%" };
      case "green":
        return { bottom: "15%", left: "26%" };
      case "red":
        return { top: "4%", left: "26%" };
      default:
        return {};
    }
  };

  const cubePosition = getCubePosition(playerColour);

  return (
    <div className="WebPage">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {isModalOpen && (
        <PlayerInputModal
          onClose={handleCloseModal}
          refreshPlayers={refreshPlayers}
        />
      )}
      <Chat />
      <Board players={players} setPlayers={setPlayers} />
      <ExitGameButton onExitGame={deletePlayer} colour={playerColour} />
      <div className="cube-container" style={cubePosition}>
        <Cube dots={dots} onClick={handleCubeClick} disabled={isRolling} />
      </div>
    </div>
  );
};

export default WebPage;
