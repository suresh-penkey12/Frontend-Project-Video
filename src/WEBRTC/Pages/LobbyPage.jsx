import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../ScoketProvider/socketProvider";
import "../../STYLES/WebRTc_Lobby.scss"
const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
   
  // localStorage.setItem("email",email);
  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/DashBoard/connections/friends/room/${room}`);
    },
    [navigate]
  );
  

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    // socket.on("chat:message", handleIncomingMessage);
    return () => {
      socket.off("room:join", handleJoinRoom);
      // socket.off("chat:message", handleIncomingMessage);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="lobby-container" style={{marginTop:"150px"}}>
      <h1>Lobby</h1>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="email">Email ID:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <label htmlFor="room">Room Number:</label>
        <input
          type="text"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        
        <button type="submit">Join</button>
      </form>
    </div>
  );
};

export default LobbyScreen;
