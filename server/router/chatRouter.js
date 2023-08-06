const express = require('express')
const chatController = require('../controller/chatController')
const createSession = require('../middlewares/createSession')

const chatRouter = express.Router()

chatRouter.use('/', createSession.verefyToken, chatController.getChats)

module.exports = chatRouter