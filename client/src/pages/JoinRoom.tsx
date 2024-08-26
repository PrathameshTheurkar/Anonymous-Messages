import { ChangeEvent, FormEvent } from "react"
import { Socket } from "socket.io-client"
import { useNavigate } from "react-router-dom"
import { Box, Button, Card, TextField, Typography } from "@mui/material"

const JoinRoom = ({username, setUsername, room, setRoom, socket}: {
    username: null | string,
    setUsername: (username: string) => void
    room: null | string,
    setRoom: (room: string) => void,
    socket: Socket
}) => {


    const navigate = useNavigate()

    const JoinRoomRequest = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(username != '' || room != ''){
            socket.emit('join_room', {
                username,
                room
            })
        }

        navigate('/chat')
    }

    return <div style={{
        padding: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}>

    <Box component='form' onSubmit={JoinRoomRequest} noValidate sx={{mt: 1}}>
        
    <Card sx={{
        minWidth: 275,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        p: 4
    }}>
        <Typography variant="h5">JOIN ROOM</Typography>
        <TextField 
        fullWidth
        variant='outlined'
        label='Username'
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value)
        }}
        />

        <TextField 
        fullWidth
        variant='outlined'
        label='Room'
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setRoom(e.target.value)
        }}
        />

        <Button
        type="submit"
        variant="contained"
        >
            Join Room
        </Button>
    </Card>
    
    </Box>    
    </div>
}

export default JoinRoom