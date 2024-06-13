import React, { useState } from 'react'
import "./App.css"
import io from 'socket.io-client'
import Chat from './Chat';


const socket = io.connect("http://localhost:8000")

function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);


  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);

    }
  }


  return (
    <div className='App'>
      {!showChat ? (
        <div className='joinChatContainer'>
          <h3>Chat App</h3>
          <input type="text" placeholder='Enter User Name' value={userName} onChange={(e) => setUserName(e.target.value)} />
          <input type="text" placeholder='Enter Room Name' value={room} onChange={(e) => setRoom(e.target.value)} />
          <button onClick={joinRoom} >Join A Room</button>
        </div>
      )
        : (
          <Chat socket={socket} userName={userName} room={room} />
        )
      }
    </div>
  )
}

export default App
