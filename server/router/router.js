const express = require('express')
const authRouter = require('./authRouter')
const chatRouter = require('./chatRouter')

const router = express.Router()

router.use('/auth', authRouter)
router.use('/chat', chatRouter)

module.exports = router