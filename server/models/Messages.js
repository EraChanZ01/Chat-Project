const mongoose = require("mongoose")
const { Schema } = mongoose

const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    body: {
        type: String
    },
    chatId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Chat'
    },
    createdAt: { type: Date, default: Date.now() }
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message