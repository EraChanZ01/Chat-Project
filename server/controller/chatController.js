const Chat = require('../models/Chats')
const Message = require('../models/Messages')

module.exports.getChats = async (req, res, next) => {
    try {
        const chats = await Chat.find({ participants: { $in: [req.tokenData._id] } })
            .populate({
                path: 'participants',
                select: ['-password','-friends']
            })
        const resData = []
        for (let i = 0; i < chats.length; i++) {
            const sender = chats[i].participants.find(
                (participant) => participant !== req.tokenData._id
            )
            const message = await Message.findOne({ chatId: chats[i]._id })
            resData.push({ ...chats[i]._doc, lastMessage: message, interlocutors: sender })
        }
        res.status(200).send(resData)
    } catch (e) {
        next(e)
    }
}