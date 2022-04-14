import './App.css';
import { io } from 'socket.io-client';
import { useState } from 'react';
import Chat from './components/Chat';
import Join from './components/Join';

const socket = io.connect('http://chat-api-online.herokuapp.com')

function App() {
  const [user, setUser] = useState('')
  const [room, setRoom] = useState('')
  const [isConnected, setIsConnected] = useState(false)

  const handleUsername = (event) => setUser(event.target.value)
  const handleRoom = (event) => setRoom(event.target.value)

  const joinRoom = (event) => {
    event.preventDefault();
    if (user !== '' && room !== '') {
      socket.emit('join', room)
      setIsConnected(true);
    }
  }

  return (
    <div className="App">
      {
        !isConnected &&
        <>
          <Join joinRoom={joinRoom}
            user={handleUsername}
            room={handleRoom} />
        </>
      }

      {
        isConnected &&

        <Chat socket={socket} username={user} room={room} />
      }
    </div>
  );
}

export default App;
