const express = require('express')
const userController = require('../controller/userController')
const hashPass = require('../middlewares/hashPassword')
const createSession = require('../middlewares/createSession')

const authRouter = express.Router()

authRouter.post("/register", hashPass.hashPassword, userController.register)
authRouter.post("/login", userController.login)
authRouter.get("/",createSession.verefyToken, createSession.checkAuth)

module.exports = authRouter