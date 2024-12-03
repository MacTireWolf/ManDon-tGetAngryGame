  import React, { useRef, useState } from "react";
  import { Helmet } from "react-helmet";
  import "../styles/components/WebPage.css";
  import "../styles/Consts.css";
  import Chat from "../organisms/Chat";
  import Board from "./Board";
  import ExitGameButton from "../organisms/ExitGameButton";
  import Cube from "../organisms/Cube";
  import PlayerInputModal from "./PlayerInputModal";

  const WebPage = () => {
    const title = "Chińczyk"
    const boardRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const handleCloseModal = () => {
      setIsModalOpen(false);
    }
    const refreshPlayers = () => {
      if(boardRef.current){
        boardRef.current.getData();
      }
    };
    
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
        <Chat/>
        <Board ref={boardRef}/>
        <ExitGameButton/>
        <Cube dots={6}/>
      </div>
      
      
    );
  }

  export default WebPage;
