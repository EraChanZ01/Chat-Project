const express = require('express')
const userController = require('../controller/userController')
const hashPass = require('../middlewares/hashPassword')

const userRouter = express.Router()

userRouter.post("/", hashPass.hashPassword, userController.register)

module.exports = userRouter