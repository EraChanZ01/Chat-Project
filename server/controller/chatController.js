const Chat = require('../models/Chats')
const Message = require('../models/Messages')
const User = require('../models/Users')
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
            const message = await Message.aggregate([
                { $match: { chatId: chats[i]._id } },
                { $sort: { createdAt: -1 } },
                { $limit: 1 }
            ])
            resData.push({ ...chats[i]._doc, lastMessage: message[0], interlocutors: sender })
        }
        res.status(200).send(resData)
    } catch (e) {
        next({ code: 500, message: 'Error receiving chats' })
    }
}
module.exports.getOneChat = async (req, res, next) => {
    const { chatId } = req.params
    try {
        const chat = await Chat.findOne({ _id: chatId })
            .populate({
                path: 'participants',
                select: ['-password', '-friends']
            })

        const participant = chat.participants.find(
            (participant) => participant.phoneNumber !== req.tokenData.phoneNumber
        )
        const messages = await Message.find({ chatId: chatId })
            .sort({ createdAt: 1 })
            .populate({
                path: 'sender',
                select: ['-password', '-friends']
            })
        res.status(200).send({ messages, participant })
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
        const message = await Message.findOne({ _id: newMessage._id })
            .populate({
                path: 'sender',
                select: ['-password', '-friends']
            })
        сontroller.getChatController().emitNewMessage(participant, message)
        res.status(200).send(message)
    } catch (e) {
        next({ code: 500, message: 'Failed to send message' })
    }
}
module.exports.addFriend = async (req, res, next) => {
    try {
        const { addNumber, userNumber } = req.body
        const user = await User.findOne({ phoneNumber: userNumber }).select(['-password'])
        const friend = await User.findOne({ phoneNumber: addNumber }).select(['-password', '-friends'])
        if (user.friends.includes(friend._id)) {
            return
        }
        if (!friend) {
            return next('no such number')
        }
        await User.updateOne(
            { _id: user._id },
            { $push: { friends: friend._id } }
        )
        const chat = await Chat.create({ participants: [user._id, friend._id] })
        const chatData = {
            lastMessage: {},
            interlocutors: friend,
            _id: chat._id,
            participants: [friend, user]
        }
        res.status(200).send(chatData)
    } catch (e) {
        next(e)
    }
}