import mongoose, { Schema } from "mongoose";

const UserSchema: mongoose.Schema = new Schema({
    id: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    messages: [{type: Schema.Types.ObjectId, ref: 'Messages'}],
    rooms: [{type: Schema.Types.ObjectId, ref: 'Rooms'}]
})



const MessageSchema: mongoose.Schema = new Schema({
    username: {
        type: String,
        required: true
    },
    message: {
        type: String
    },
    room: {
        type: String,
        required: true
    },
    __createdtime__: Number
})

const RoomSchema: mongoose.Schema = new Schema({
    roomId: {
        type: String,
        required: true
    }
})

export const User = mongoose.model('User', UserSchema)
export const Messages = mongoose.model('Messages', MessageSchema)
export const Rooms = mongoose.model('Rooms', RoomSchema)
