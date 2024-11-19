import React from "react";
import { Helmet } from "react-helmet";
import "../styles/components/WebPage.css";
import "../styles/Consts.css";
import Chat from "../organisms/Chat";
import Board from "../organisms/Board";

const WebPage = () => {
  const title = "Chińczyk"
  
  return (
    <div className="WebPage">
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Chat/>
        <Board/>
    </div>
    
    
  );
}

export default WebPage;
