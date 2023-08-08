const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const config = require('../../config')
const User = require('../models/Users')


const jwtSign = promisify(jwt.sign)

module.exports.checkAuth = async (req, res, next) => {
    try {
        const userFind = await User.findOne({ _id: req.tokenData._id })
        res.status(200).send({ data: userFind })
    } catch (e) {
        next('token error')
    }
}

module.exports.verefyToken = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            throw 'not accessToken'
        }
        req.tokenData = await jwt.verify(accessToken, config.token.SECRET)
        next()
    } catch (e) {
        next('token error')
    }
}

module.exports.createdToken = async (
    {
        _id,
        phoneNumber,
        password,
    }) => await jwtSign(
        {
            _id: _id,
            phoneNumber: phoneNumber,
            password: password
        },
        config.token.SECRET,
        {
            expiresIn: config.token.EXPIRES_TIME
        }
    )