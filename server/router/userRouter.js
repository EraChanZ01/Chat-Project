const express = require('express')
const userController = require('../controller/userController')


const userRouter = express.Router()


userRouter.get("/getAll/:startNumber", userController.getAllUser)
userRouter.post('/addFriend', userController.addFriend)

module.exports = userRouter