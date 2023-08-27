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
        next({ code: 500, message: 'Error register' })
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
        next({ code: 500, message: 'Error login' })
    }
}


