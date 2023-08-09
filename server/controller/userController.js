const User = require('../models/Users')
const Chat = require('../models/Chats')

const bcrypt = require('bcrypt');
const { createdToken } = require('../middlewares/createSession')

module.exports.register = async (req, res, next) => {
    try {
        const { phoneNumber } = req.body
        const user = await User.create({ phoneNumber, password: req.hashPass })
        const token = await createdToken(user)
        return res.status(201).send({ data: user, token })
    } catch (e) {
        next(e)
    }
}
module.exports.login = async (req, res, next) => {
    try {
        const { phoneNumber, password } = req.body
        const user = await User.findOne({ phoneNumber })
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (passwordCompare) {
            const token = await createdToken(user)
            res.status(200).send({ data: user, token })
        }
    } catch (e) {
        next(e)
    }
}
module.exports.getAllUser = async (req, res, next) => {
    try {
        const { startNumber } = req.params
        const regex = new RegExp(`^${startNumber}`);
        const user = await User.findOne({ phoneNumber: "0660731775" })
        const users = await User.find({ _id: { $in: user.friends }, phoneNumber: { $regex: regex } })
        res.status(200).send(users)
    } catch (e) {
        next(e)
    }
}

module.exports.addFriend = async (req, res, next) => {
    try {
        const { addNumber, userNumber } = req.body
        const user = await User.findOne({ phoneNumber: userNumber }).select('-password')
        const friend = await User.findOne({ phoneNumber: addNumber }).select('-password')
        if (!friend) {
            return
        }
        await User.updateOne(
            { _id: user._id },
            { $push: { friends: friend._id } }
        )
        const chat = await Chat.create({ participants: [user._id, friend._id] })
        res.status(200).send(friend)
    } catch (e) {
        next(e)
    }
}