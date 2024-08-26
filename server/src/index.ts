import express from "express";
import { Request, Response } from "express";
import { createServer } from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";
import dotenv from 'dotenv'
import { User } from "./db/db";

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

mongoose.connect(MONGODB_URL , {dbName: DB_NAME})

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Welcome to Anonymous Messages</h1>')
})

const CHATBOT = 'ChatBot'
let ChatRoom = ''
let AllUsers = []

io.on("connection", (socket) => {
  socket.on('join_room', async (data) => {

    const newUser = new User({
        socketId: socket.id,
        username: data.username,
        messages: [],
        rooms: []
    })
    await newUser.save()

    socket.join(data.room)
    
    let __createdtime__ = Date.now()
    
    ChatRoom = data.room

    AllUsers.push({id: socket.id, username: data.username, room: data.room})
    let chatRoomUsers = AllUsers.filter((user) => user.room == ChatRoom)
    
    socket.to(data.room).emit('chatRoomUsers', {chatRoomUsers})
    
    io.to(data.room).emit('message', {
        msg: `Message from chat bot: ${data.username} Welcome to chat`,
        username: CHATBOT,
        __createdtime__
    })

    socket.on('send_message', (data) => {
        io.to(data.room).emit('sendMessage', data.sendMessage)
    })

  })
});


httpServer.listen(3000);