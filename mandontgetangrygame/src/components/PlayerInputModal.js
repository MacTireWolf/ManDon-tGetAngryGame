import React, { useState } from "react";
import axios from "axios";
import "../styles/components/PlayerInputModal.css";
import { backendPlayersNamesAdress } from "../Consts.js";

const PlayerInputModal = ({ onClose, refreshPlayers }) => {
  const [players, setPlayers] = useState([
    { name: "", colour: "" },
    { name: "", colour: "" },
    { name: "", colour: "" },
    { name: "", colour: "" },
  ]);

  const handlePlayerChange = (index, field, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[index][field] = value;
    setPlayers(updatedPlayers);
  };

  const handleJoinGame = () => {
    const playersToAdd = players.filter((p) => p.name && p.colour);
    const selectedColors = playersToAdd.map((p) => p.colour);
    const duplicateColors = selectedColors.filter(
      (color, index) => selectedColors.indexOf(color) !== index
    );

    if (duplicateColors.length > 0) {
      alert(`Wybrano te same kolory dla wielu graczy. Każdy gracz musi wybrać unikalny kolor.`);
      return;
    }

    if (playersToAdd.length === 0) {
      alert("Wprowadź co najmniej jednego gracza.");
      return;
    }

    const requests = playersToAdd.map((player) =>
      axios.post(backendPlayersNamesAdress + "/addPlayer", player)
    );

    Promise.allSettled(requests)
      .then((results) => {
        const failures = results.filter(
          (res) =>
            res.status === "rejected" &&
            res.reason.response?.data === "Player already exists for this color"
        );

        if (failures.length > 0) {
          alert(
            `Niektóre kolory zostały zajęte przez innych graczy: ${failures
              .map((f) => JSON.parse(f.reason.config.data).colour)
              .join(", ")}.`
          );
        }

        refreshPlayers();
        onClose(playersToAdd);
      }).catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Dołącz do gry</h2>
        {players.map((player, index) => (
          <div key={index} className="player-input">
            <input
              type="text"
              placeholder={`Wpisz imię gracza ${index + 1}`}
              value={player.name}
              onChange={(e) =>
                handlePlayerChange(index, "name", e.target.value)
              }
            />
            <select
              value={player.colour}
              onChange={(e) =>
                handlePlayerChange(index, "colour", e.target.value)
              }
            >
              <option value="">Wybierz kolor</option>
              <option value="red">Czerwony</option>
              <option value="blue">Niebieski</option>
              <option value="yellow">Żółty</option>
              <option value="green">Zielony</option>
            </select>
          </div>
        ))}
        <button onClick={handleJoinGame}>Dołącz do gry</button>
      </div>
    </div>
  );
};

export default PlayerInputModal;
