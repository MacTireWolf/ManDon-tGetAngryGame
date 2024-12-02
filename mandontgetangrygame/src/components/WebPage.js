  import React from "react";
  import { Helmet } from "react-helmet";
  import "../styles/components/WebPage.css";
  import "../styles/Consts.css";
  import Chat from "../organisms/Chat";
  import Board from "./Board";
  import ExitGameButton from "../organisms/ExitGameButton";
  import Cube from "../organisms/Cube";

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
        <Cube dots={6}/>
      </div>
      
      
    );
  }

  export default WebPage;
