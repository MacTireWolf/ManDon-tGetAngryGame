import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import "../styles/organisms/Chat.css";
import SockJS from "sockjs-client";

const Chat = ({ playerName }) => {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");
    const [client, setClient] = useState(null);

    useEffect(() => {
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
    }, []);

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

    return (
        <div className="Chat">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.sender}:</strong>{msg.content}
                    </div>
                ))}
            </div>
            <input
                type="text"
                placeholder="Napisz coś..."
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
        </div>
    );
};

export default Chat;
