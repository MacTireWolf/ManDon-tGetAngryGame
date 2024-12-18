import React, { useEffect, useState } from "react";
import "../styles/organisms/Chat.css";

const Chat = ({ playerName }) => {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");
    const [ws, setWs] = useState(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8081/chat");

        socket.onopen = () => {
            console.log("Connected to WebSocket.");
            setConnected(true);
        };

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
            setConnected(false);
        };

        socket.onclose = () => {
            console.log("WebSocket connection closed.");
            setConnected(false);
        };

        setWs(socket);

    }, []);

    const sendMessage = () => {
        if (ws && currentMessage.trim()) {
            const chatMessage = {
                sender: playerName,
                content: currentMessage,
            };

            ws.send(JSON.stringify(chatMessage));
            setCurrentMessage("");
        }
    };

    return (
        <div className="Chat">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.sender}: </strong>{msg.content}
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
            {!connected && <p>Connecting to the chat server...</p>}
        </div>
    );
};

export default Chat;
