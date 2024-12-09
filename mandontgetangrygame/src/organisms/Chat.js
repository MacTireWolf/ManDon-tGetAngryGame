import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import "../styles/organisms/Chat.css";
import SockJS from "sockjs-client";
import axios from "axios";
import { backendPlayersNamesAdress } from "../Consts";

const Chat = () => {
    const [playerName, setPlayerName] = useState("");
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");
    const [client, setClient] = useState(null);
    const [nameSet, setNameSet] = useState(false);

    const checkIfPlayerExists = async (name) => {
        try {
            const response = await axios.get(backendPlayersNamesAdress + "/getPlayers");
            const players = response.data;
            const nameExists = Object.values(players).some(player => player.name === name);
            return nameExists;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    useEffect(() => {
        if (nameSet) {
            const newClient = new Client({
                brokerURL: "ws://localhost:8080/chat-websocket",
                webSocketFactory: () => new SockJS("http://localhost:8080/chat-websocket"),
                onConnect: () => {
                    console.log("Connected to WebSocket.");

                    newClient.subscribe("/topic/public", (messageOutput) => {
                        const message = JSON.parse(messageOutput.body);
                        setMessages((prevMessages) => [...prevMessages, message]);
                    });
                },
                onStompError: (error) => {
                    console.error("STOMP error:", error);
                },
            });

            newClient.activate();
            setClient(newClient);

            return () => {
                newClient.deactivate();
            };
        }
    }, [nameSet]);

    const sendMessage = () => {
        if (client && client.connected && currentMessage.trim()) {
            const chatMessage = {
                sender: playerName,
                content: currentMessage,
            };

            client.publish({
                destination: "/app/sendMessage",
                body: JSON.stringify(chatMessage),
            });

            setCurrentMessage("");
        }
    };

    const handleNameSubmit = async () => {
        if (playerName.trim()) {
            const isValidName = await checkIfPlayerExists(playerName);
            if (!isValidName) {
                alert("Imię niepoprawne. Nie ma takiego gracza.");
            } else {
                setNameSet(true);
            }
        } else {
            alert("Wpisz swoje imię.");
        }
    };

    return (
        <div className="Chat">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.sender}:</strong> {msg.content}
                    </div>
                ))}
            </div>
            {nameSet && (
                <div className="message-input">
                    <input
                        type="text"
                        placeholder="Napisz coś..."
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                </div>
            )}
            {!nameSet && (
                <div className="name-input">
                    <input
                        type="text"
                        placeholder="Wpisz swoje imię"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                    />
                    <button onClick={handleNameSubmit}>Dodaj</button>
                </div>
            )}
        </div>
    );
};

export default Chat;
