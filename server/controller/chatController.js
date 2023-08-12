const Chat = require('../models/Chats')
const Message = require('../models/Messages')
const сontroller = require('../socketInit')

module.exports.getChats = async (req, res, next) => {
    try {
        const chats = await Chat.find({ participants: { $in: [req.tokenData._id] } })
            .populate({
                path: 'participants',
                select: ['-password', '-friends']
            })
        const resData = []
        for (let i = 0; i < chats.length; i++) {
            const sender = chats[i].participants.find(
                (participant) => participant.phoneNumber !== req.tokenData.phoneNumber
            )
            const message = await Message.findOne({ chatId: chats[i]._id })
            resData.push({ ...chats[i]._doc, lastMessage: message, interlocutors: sender })
        }
        res.status(200).send(resData)
    } catch (e) {
        next({ code: 500, message: 'Error receiving chats' })
    }
}
module.exports.getOneChat = async (req, res, next) => {
    const { chatId } = req.params
    try {
        const messages = await Message.find({ chatId: chatId })
            .sort({ createdAt: 1 })
            .populate({
                path: 'sender',
                select: ['-password', '-friends']
            })
        res.status(200).send(messages)
    } catch (e) {
        next({ code: 500, message: 'Error receiving message' })
    }
}
module.exports.sendMessage = async (req, res, next) => {
    const { chatId, value, participant } = req.body
    try {
        const newMessage = await Message.create({
            sender: req.tokenData._id,
            body: value,
            chatId: chatId
        })
        сontroller.getChatController().emitNewMessage(participant, newMessage)
        res.status(200).send(newMessage)
    } catch (e) {
        next({ code: 500, message: 'Failed to send message' })
    }
}   