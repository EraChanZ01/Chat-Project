import mongoose from "mongoose";
const { Schema } = mongoose

const messageSchema = new Schema({
    body: String
})

const Message = mongoose.model('Chat', messageSchema)

export default Message