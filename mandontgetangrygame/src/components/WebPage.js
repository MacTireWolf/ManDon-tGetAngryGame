import React from "react";
import { Helmet } from "react-helmet";
import "../styles/components/WebPage.css";
import "../styles/Consts.css";
import Chat from "../organisms/Chat";
import Board from "../organisms/Board";
import ExitGameButton from "../organisms/ExitGameButton";

const WebPage = () => {
  const title = "Chińczyk"
  
  return (
    <div className="WebPage">
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Chat/>
        <Board/>
        <ExitGameButton/>
    </div>
    
    
  );
}

export default WebPage;
