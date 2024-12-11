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
  const [dots, setDots] = useState(3);
  const [isRolling, setIsRolling] = useState(false);
  const [selectedPawnId, setSelectedPawnId] = useState(null);
  const [movedPawns, setMovedPawns] = useState({});

  const handlePawnMove = (pawnId) => {
    const currentPlayer = players[currentPlayerIndex];
    setMovedPawns((prev) => ({
      ...prev,
      [currentPlayer.colour]: [...(prev[currentPlayer.colour] || []), pawnId],
    }));
  };

  const handleCloseModal = (newPlayers) => {
    setIsModalOpen(false);
    console.log("Adding new players:", newPlayers);
  setPlayers((prevPlayers) => {
    const updatedPlayers = [...prevPlayers, ...newPlayers];
    console.log("Updated players:", updatedPlayers);
    return updatedPlayers;
  });
  if (newPlayers.length > 0) {
    setPlayerColour(newPlayers[0].colour);
  }
  };

  const refreshPlayers = async () => {
    axios
      .get(backendPlayersNamesAdress + "/getPlayers")
      .then((response) => {
        const fetchedPlayers = Object.values(response.data);
        setPlayers((prevPlayers) => {
          return prevPlayers.map((player) =>
            fetchedPlayers.find((p) => p.colour === player.colour) || player
          );
        });
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
    if (!selectedPawnId) {
      alert("Wybierz pionek, którym chcesz się ruszyć.");
      return;
    }

    const randomDots = Math.floor(Math.random() * 6) + 1;
    setDots(randomDots);
    setIsRolling(true);
    sendMoveRequest(randomDots, selectedPawnId);
  };

  const sendMoveRequest = (dots, pawnId) => {
    const currentPlayer = players[currentPlayerIndex];

    if (!currentPlayer) return;

    const selectedPawn = currentPlayer.pawns.find((pawn) => pawn.id === pawnId);

    if (!selectedPawn) {
      console.error("Pawn not found.");
      setIsRolling(false);
      return;
    }

    if (selectedPawn.position === 0 && dots !== 6) {
      console.log("Pawn needs a 6 to move onto the board. Try again.");
      setIsRolling(false);
      return;
    }

    selectedPawn.position += dots;

    const updatedPawns = currentPlayer.pawns.map((pawn) =>
      pawn.id === pawnId ? { ...pawn, position: selectedPawn.position } : pawn
    );
    const updatedPlayer = { ...currentPlayer, pawns: updatedPawns };

    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.colour === updatedPlayer.colour ? updatedPlayer : player
      )
    );

    setMovedPawns((prev) => ({
      ...prev,
      [currentPlayer.colour]: [...(prev[currentPlayer.colour] || []), pawnId],
    }));
    setSelectedPawnId(null);
    setIsRolling(false);

    const requestData = {
      colour: currentPlayer.colour,
      pawnId: pawnId,
      steps: dots,
    };
    console.log("Sending request:", requestData);

    axios
      .post(backendPlayersNamesAdress + `/movePawn`, requestData)
      .then((response) => {
        console.log("Pawn moved:", response.data);
        const updatedPlayer = response.data;
        setPlayers((prevPlayers) =>
          prevPlayers.map((player) =>
            player.colour === updatedPlayer.colour ? updatedPlayer : player
          )
        );
        setMovedPawns((prev) => ({
          ...prev,
          [currentPlayer.colour]: [...(prev[currentPlayer.colour] || []), pawnId],
        }));
        setSelectedPawnId(null);
        setIsRolling(false);

        if (dots === 6 || selectedPawn.position !== 0) {
          nextPlayer();
        }
      })
      .catch((error) => {
        console.error("Error moving pawn:", error);
        setIsRolling(false);
      });
  };

  const nextPlayer = () => {
    const newIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(newIndex);
    setPlayerColour(players[newIndex]?.colour || null);
    setDots(3);
  };
  
  console.log("Selected Pawn ID:", selectedPawnId);

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
      <Chat playerName={players[currentPlayerIndex]?.name || "Anonymous"} />
      <Board
        players={players}
        setPlayers={setPlayers}
        setSelectedPawnId={setSelectedPawnId}
        movedPawns={movedPawns}
        handlePawnMove={handlePawnMove}
      />
      <ExitGameButton onExitGame={deletePlayer} colour={playerColour} />
      <div className="cube-container" style={cubePosition}>
        <Cube dots={dots} onClick={handleCubeClick} disabled={isRolling} />
      </div>
    </div>
  );
};

export default WebPage;
