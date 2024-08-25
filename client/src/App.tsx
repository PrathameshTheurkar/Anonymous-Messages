import {io, Socket}  from 'socket.io-client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Chat from './pages/Chat'
import Layout from './Layout'
import JoinRoom from './pages/JoinRoom'
import { useState } from 'react'


const socket: Socket = io('http://localhost:3000')

function App() {

  // Create Context for this
  const [username, setUsername] = useState<null | string>('')
  const [room, setRoom] = useState<null | string>('')

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout /> }>
      
      <Route path='/join-room' element={<JoinRoom 
      username={username}
      setUsername={setUsername}
      room={room}
      setRoom={setRoom}
      socket={socket}
      />}/>

      <Route path='/chat' element={<Chat 
      username={username}
      room={room}
      socket={socket}
      />}/>

      </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
