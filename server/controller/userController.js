const User = require('../models/Users')
const { createdToken } = require('../middlewares/createSession')

module.exports.register = async (req, res, next) => {
    try {
        const { phoneNumber, password } = req.body
        const user = await User.create({ phoneNumber, password })
        const token = await createdToken(user)
        return res.status(201).send({ data: user, token })
    } catch (e) {
        next(e)
    }
}