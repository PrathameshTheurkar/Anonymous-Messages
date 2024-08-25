import { ChangeEvent, useEffect, useState } from "react"
import { Socket } from "socket.io-client"

interface Message{
    msg: string,
    username: string,
    __createdtime__: number
}

// interface ChatRoomUsers {
//     id: string,
//     username: string,
//     room: string
// }


interface Chat{
    username: null | string,
    room: null | string,
    socket: Socket
}

const Chat = ({username, room, socket}: Chat) => {

    const [message, setMessage] = useState<Message[]>([])
    const [sendMessage, setSendMessage] = useState<string | null>('')
    const [msg, setMsg] = useState<string[]>([])
    // const [chatRoomUsers, setChatRoomUsers] = useState<ChatRoomUsers[]>([]) 

    const formatDateFromTimeStamp = (timeStamp: number): string => {
        const date = new Date(timeStamp)
        return date.toLocaleString()
    }

    const sendMessages = () => {
        if(sendMessage){
            
        const __createdtime__ = Date.now()

        socket.emit('send_message', {
            username,
            room,
            sendMessage,
            __createdtime__
        })
        }
    }

    useEffect(() =>{
        socket.on('message', (data) => {
            setMessage((state) => [...state, data])
        })
        
        // socket.on('chatRoomUsers', (data) => {
        //     setChatRoomUsers(data.chatRoomUsers)
        // })

        socket.on('sendMessage', (data) => {
            setMsg((state) => [...state, data])
        })

        return () => {
            socket.off('message')
            socket.off('sendMessage')
        }
        

    }, [socket, message, room])

    return <>    
    {message.map((msg, index) => {
        return <div key={index}>
            <p>{msg.msg}</p>
            <p>{msg.username}</p>
            <p>{formatDateFromTimeStamp(msg.__createdtime__)}</p>
        </div>
    })}

    <div>
        <form action="">
        <input type="text" name="message" id="message" onChange={(e: ChangeEvent<HTMLInputElement>) => setSendMessage(e.target.value)}/>
        <button type="submit" onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault()
            sendMessages()
        }}>Send Message</button>
        </form>
    </div>

    {msg.map((m, index) => {
        return <div key={index}>
            <p>{m}</p>
        </div>
    })}
    </>
}

export default Chat