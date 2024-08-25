import React from "react"
import { Socket } from "socket.io-client"
import { useNavigate } from "react-router-dom"

const JoinRoom = ({username, setUsername, room, setRoom, socket}: {
    username: null | string,
    setUsername: (username: string) => void
    room: null | string,
    setRoom: (room: string) => void,
    socket: Socket
}) => {


    const navigate = useNavigate()

    const JoinRoomRequest = () => {
        if(username != '' || room != ''){
            socket.emit('join_room', {
                username,
                room
            })
        }
    }
    
    return <>
    <form action="">
        <input type="text" name="username" id="username" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}/>
        <input type="text" name="room" id="room" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoom(e.target.value)}/>
        <button type='submit' onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        JoinRoomRequest()
        navigate('/chat')
        }}>Join Room</button>
    </form>

    </>
}

export default JoinRoom