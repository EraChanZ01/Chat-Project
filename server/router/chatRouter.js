const express = require('express')
const chatController = require('../controller/chatController')
const createSession = require('../middlewares/createSession')


const chatRouter = express.Router()

chatRouter.use(createSession.verefyToken)

chatRouter.get('/', chatController.getChats)
chatRouter.get('/:chatId', chatController.getOneChat)
chatRouter.post('/sendMessage', chatController.sendMessage)
chatRouter.post('/addFriend', chatController.addFriend)

module.exports = chatRouter