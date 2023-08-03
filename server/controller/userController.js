const User = require('../models/Users')
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
        const users = await User.find()
        res.status(200).send({ data: users })
    } catch (e) {
        next(e)
    }
}