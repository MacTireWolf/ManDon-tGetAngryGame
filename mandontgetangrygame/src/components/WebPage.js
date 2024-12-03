  import React, { useRef, useState } from "react";
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
    const title = "Chińczyk"
    const boardRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [playerColour, setPlayerColour] = useState(null);
    const handleCloseModal = (colour) => {
      setIsModalOpen(false);
      setPlayerColour(colour);
    }
    const refreshPlayers = () => {
      if(boardRef.current){
        boardRef.current.getData();
      }
    };

    const deletePlayer = (colour) => {
      axios.delete(backendPlayersNamesAdress + `/deletePlayer/${colour}`).then((response) => {
        console.log(response.data);
        refreshPlayers();
        window.close();
      }).catch((error) => {console.error(error)});
    };
    
    return (
      <div className="WebPage">
        <Helmet>
          <title>{title}</title>
        </Helmet>
        {isModalOpen && (
        <PlayerInputModal
          onClose={(_, colour) => handleCloseModal(colour)}
          refreshPlayers={refreshPlayers}
        />
        )}
        <Chat/>
        <Board ref={boardRef}/>
        <ExitGameButton onExitGame={deletePlayer} colour={playerColour}/>
        <Cube dots={6}/>
      </div>
      
      
    );
  }

  export default WebPage;
