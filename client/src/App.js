import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./components/Chat/Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, SetUsername] = useState("");
  const [room, SetRoom] = useState("");
  const [showChat, SetShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      SetShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>RPC chat</h3>
          <input
            type="text"
            placeholder="Username..."
            onChange={(e) => {
              SetUsername(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(e) => {
              SetRoom(e.target.value);
            }}
          />
          <button onClick={joinRoom}>Join a room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
