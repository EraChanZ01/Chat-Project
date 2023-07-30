import mongoose from "mongoose";
const { Schema } = mongoose

const chatSchema = new Schema({
    participants: [{ id: mongoose.ObjectId }]
})

const Chat = mongoose.model('Chat', chatSchema)

export default Chat