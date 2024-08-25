import express from "express";
import { Request, Response } from "express";
import { createServer } from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";
import dotenv from 'dotenv'

dotenv.config({
    path: __dirname + '/../.env'
})

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

const MONGODB_URL: string = process.env.MONGODB_URL ? process.env.MONGODB_URL : '' 
const DB_NAME: string = process.env.DB_NAME ? process.env.DB_NAME : ''

// mongoose.connect(MONGODB_URL , {dbName: DB_NAME})


app.get('/', (req: Request, res: Response) => {
    res.send(`${process.env.MONGODB_URL}`)
})

const CHATBOT = 'ChatBot'
let ChatRoom = ''
let AllUsers = []

io.on("connection", (socket) => {
  socket.on('join_room', (data) => {
    
    socket.join(data.room)
    
    let __createdtime__ = Date.now()
    
    ChatRoom = data.room
    AllUsers.push({id: socket.id, username: data.username, room: data.room})
    let chatRoomUsers = AllUsers.filter((user) => user.room == ChatRoom)
    
    socket.to(data.room).emit('chatRoomUsers', {chatRoomUsers})
    // socket.emit('chatRoomUsers', {chatRoomUsers})
    
    socket.to(data.room).emit('message', {
        msg: `Message from chat bot: ${data.username} Welcome to chat`,
        username: CHATBOT,
        __createdtime__
    })

    // socket.emit('message', {
    //     msg: `Message from chat bot: ${data.username} Welcome to chat`,
    //     username: CHATBOT,
    //     __createdtime__
    // })

    socket.on('send_message', (data) => {
        socket.to(data.room).emit('sendMessage', data.sendMessage)
    })

  })
});


httpServer.listen(3000);