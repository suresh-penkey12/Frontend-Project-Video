import React, { useEffect, useCallback, useState ,useRef} from "react";
import ReactPlayer from "react-player";
import peer from "../Services/peerService";
import { useSocket } from "../ScoketProvider/socketProvider";
import "../../STYLES/WebRtc_room_page.scss"
const RoomPage = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [messages, setMessages] = useState([]); // Chat messages
  const [message, setMessage] = useState(""); // Input message
  const peerRef =useRef(null);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const[callButton,setCallButton]=useState(false);
  let callon =sessionStorage.getItem("callon");
  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    sessionStorage.setItem("callon",true);
    setVideoEnabled(true);
    setCallButton(false);
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);
   

  const sendMessage = () => {
    if (message.trim() === "") return;
    const chatData = { message, sender:"-->"};
    console.log("sending message",chatData); // No room needed here
    socket.emit("chat:message", chatData);
    // setMessages((prev) => [...prev, chatData]);
    setMessage("");
  };

  const handleIncomingMessage = useCallback((data) => {
    setMessages((prev) => [...prev, data]); // Append new message to chat
  }, []);

  useEffect(() => {
    socket.on("chat:message", handleIncomingMessage);

    return () => {
      socket.off("chat:message", handleIncomingMessage);
    };
  }, [socket, handleIncomingMessage]);

  const handleEndCall = useCallback(() => {
    sessionStorage.setItem("callon",false);
    setVideoEnabled(false);
    if (myStream) {
      myStream.getTracks().forEach((track) => track.stop()); // Stop media stream
      setMyStream(null);
    }
  
    if (remoteStream) {
      remoteStream.getTracks().forEach((track) => track.stop()); // Stop remote stream
      setRemoteStream(null);
    }
  
    if (peer.peer) {
      peer.peer.close(); // Close the peer connection
    }
  
    socket.emit("call:end", { to: remoteSocketId }); // Notify the other user
    setRemoteSocketId(null); // Reset remote user
  }, [myStream, remoteStream, socket, remoteSocketId]);
  

  useEffect(() => {
    socket.on("call:ended", () => {
      if (myStream) {
        myStream.getTracks().forEach((track) => track.stop());
        setMyStream(null);
      }
      if (remoteStream) {
        remoteStream.getTracks().forEach((track) => track.stop());
        setRemoteStream(null);
      }
      peer.peer.close();
      setRemoteSocketId(null);
    });
  
    return () => {
      socket.off("call:ended");
    };
  }, [socket, myStream, remoteStream]);
  
  const toggleVideo = () => {
    if (myStream) {
      myStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled; // Toggle video track
      });
      setVideoEnabled(!videoEnabled);
    }
  };

  return (
    <div className="room-container" style={{marginTop:"150px"}}>
      <h1>Room Page</h1>
      <h4>{remoteSocketId ? 'Connected' : 'No one in room'}</h4>

      {myStream && (
        <button className="call-btn" onClick={sendStreams}>
          Send Stream
        </button>
      )}

      <div className="stream-container">
        {myStream && (
          <div className="stream">
            <h1>My Stream</h1>
            <ReactPlayer className="video-players" playing muted  url={myStream} />
          </div>
        )}
        {remoteStream && (
          <div className="stream">
            <h1>Remote Stream</h1>
            <ReactPlayer className="video-players" playing muted  url={remoteStream} />
          </div>
        )}
      </div>

      <div className="button-container">
        {remoteSocketId && (
          <button className="call-btn" onClick={handleCallUser}>
            CALL
          </button>
        )}
        {callon && (
          <button className="end-btn" onClick={handleEndCall}>
            End Call
          </button>
        )}
        <button className="toggle-btn" onClick={toggleVideo}>
          {videoEnabled ? 'Turn Off Video' : 'Turn On Video'}
        </button>
      </div>

      <h2>Chat Box</h2>
      <div className="chat-container">
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.sender}:</strong> {msg.message}
          </p>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default RoomPage;
