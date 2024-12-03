import React, { useState } from "react";
import axios from 'axios';
import "../styles/components/PlayerInputModal.css";
import { backendPlayersNamesAdress } from "../Consts.js";

const PlayerInputModal = ({onClose, refreshPlayers}) => {
    const [playerName,setPlayerNames] = useState("");
    const [colour, setColour] = useState("");
    const handleJoinGame = () => {
        if(!playerName || !colour){
            alert("Please enter your name and select a color.");
            return;
        }

        axios.post(backendPlayersNamesAdress + "/setNames", {[colour]: playerName}).then((response) => {
            console.log(response.data);
            refreshPlayers();
            onClose();
        }).catch((error) => console.error(error));
    }

    return(
        <div className="modal-overlay">
            <div className="modal">
            <h2>Dołącz do gry</h2>
            <input
                type="text"
                placeholder="Wpisz swoje imię"
                value={playerName}
                onChange={(e) => setPlayerNames(e.target.value)}
            />
            <select
                value={colour}
                onChange={(e) => setColour(e.target.value)}
            >
            <option value="">Wybierz kolor</option>
            <option value="red">Czerwony</option>
            <option value="blue">Niebieski</option>
            <option value="green">Zielony</option>
            <option value="yellow">Żółty</option>
            </select>
            <button onClick={handleJoinGame}>Dołącz do gry</button>
            </div>
        </div>
    );
};

export default PlayerInputModal;
