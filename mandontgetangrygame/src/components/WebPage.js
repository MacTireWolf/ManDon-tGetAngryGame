import React from "react";
import { Helmet } from "react-helmet";
import "../styles/components/WebPage.css";
import "../styles/Consts.css";
import Chat from "../organisms/Chat";

const WebPage = () => {
  const title = "Chińczyk"
  
  return (
    <div className="WebPage">
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Chat/>
    </div>
    
  );
}

export default WebPage;
